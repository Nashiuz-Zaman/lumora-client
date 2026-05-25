"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductSortOptions } from "@/constants/product";
import { buildUrlWithParams } from "@/utils/common/http/buildUrlWithParams";
import { csvToBooleanRecord } from "@/utils/common/io/csvUtils";
import { getQueryParamsFromSearchParams } from "@/utils/common/http/getQueryParamsFromSearchParams";
import { decompressBase64UrlToObject } from "@/utils/common/io/compression";
import { useEffect, useMemo, useRef } from "react";
import { useSearchProductsQuery } from "@apiSlices/product.api.slice";
import { isEqual } from "lodash";
import { IDecompressedParams, ISearchProductQueriesForm } from "@/types";
import { buildProductSearchQueryParams } from "@/utils/product/buildProductSearchQueryParams";

export const useProductSearchQueries = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const previousSubCategoryRef = useRef<string>("");

  // 1. Extract values from URL (The Source of Truth)
  const formParamsFromUrl: ISearchProductQueriesForm = useMemo(() => {
    const rawQueryParams = getQueryParamsFromSearchParams(searchParams, [
      "page",
      "search",
      "q",
      "form",
    ]);

    const q = typeof rawQueryParams.q === "string" ? rawQueryParams.q : "";

    let decompressed: IDecompressedParams | null = null;

    if (q) {
      decompressed = decompressBase64UrlToObject<IDecompressedParams>(q);
    }

    const currentSubCategory = decompressed?.subCategory ?? "";

    const shouldResetBrands =
      previousSubCategoryRef.current &&
      previousSubCategoryRef.current !== currentSubCategory;

    previousSubCategoryRef.current = currentSubCategory;

    return {
      page: Number(rawQueryParams.page) || 1,
      search: String(rawQueryParams.search) ?? "",
      priceMax: decompressed?.priceMax ?? 50000,
      priceMin: decompressed?.priceMin ?? 0,
      sort: decompressed?.sort ?? `-${ProductSortOptions[1].value}`,
      subCategory: csvToBooleanRecord(currentSubCategory) ?? {},
      brand: shouldResetBrands
        ? {}
        : (csvToBooleanRecord(decompressed?.brand) ?? {}),
    };
  }, [searchParams]);

  // 2. Initialize RHF
  const form = useForm<ISearchProductQueriesForm>({
    defaultValues: formParamsFromUrl,
  });

  // 3. If URL changes (for example back button), update form fields
  useEffect(() => {
    const currentValues = form.getValues();

    if (!isEqual(currentValues, formParamsFromUrl)) {
      form.reset(formParamsFromUrl);
    }
  }, [formParamsFromUrl, form]);

  // 4. URL Update Logic
  const pushToUrl = (
    values: ISearchProductQueriesForm,
    form: boolean = true,
  ) => {
    const urlParams = buildProductSearchQueryParams(values, form);

    const newUrl = buildUrlWithParams(path, urlParams);

    // Updates the URL in the address bar WITHOUT triggering Next.js server actions
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", newUrl);

      // Dispatch a popstate event so useSearchParams() knows the URL changed
      window.dispatchEvent(new Event("popstate"));
    }
  };

  // 6. Manual Submit Logic
  const handleSubmit = form.handleSubmit((data) => {
    pushToUrl({ ...data, page: 1 });
  });

  // 7. API Query Params
  const apiQueryParams = useMemo(() => {
    return buildProductSearchQueryParams(formParamsFromUrl);
  }, [formParamsFromUrl]);

  // --- Fetch products ---
  const { data, isFetching } = useSearchProductsQuery(apiQueryParams);

  return {
    control: form.control,
    handleSubmit,
    setValue: form.setValue,
    changePage: (page: number) => {
      pushToUrl({ ...form.getValues(), page });
    },
    products: data?.data?.products ?? [],
    brands: data?.data?.brands ?? [],
    queryMeta: data?.data?.queryMeta,
    isFetching,
  };
};
