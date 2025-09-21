"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductSortOptions } from "@/constants/product";
import { useGetProductsForSearchPageQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import {
  buildUrlWithParams,
  csvToBooleanRecord,
  getQueryParamsFromSearchParams,
  decompressBase64UrlToObject,
  booleanRecordToCsv,
  cleanObject,
} from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { useProductSearchParamsManagement } from "./useProductSearchParamsManagement";

export interface ISearchPageForm {
  subCategory: Record<string, boolean>;
  brand: Record<string, boolean>;
  sort: string;
  priceMin: number;
  priceMax: number;
  page: number;
  search?: string;
}

export interface IProductSearchQueryParams {
  page: number;
  search?: string;
  q?: string;
  form?: boolean;
}

export const useSearchPageProductsQueries = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { buildSearchQueryParams } = useProductSearchParamsManagement();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- Parse query params from URL ---
  const rawParamsFromUrl = getQueryParamsFromSearchParams(searchParams, [
    "page",
    "search",
    "q",
    "form",
  ]);

  const paramsFromUrl: IProductSearchQueryParams = {
    page: rawParamsFromUrl.page === "" ? 1 : Number(rawParamsFromUrl.page),
    form: !!rawParamsFromUrl.form,
    search:
      typeof rawParamsFromUrl.search === "string"
        ? rawParamsFromUrl.search
        : "",
    q: typeof rawParamsFromUrl.q === "string" ? rawParamsFromUrl.q : "",
  };

  // --- Fetch products (reacts only to URL changes) ---
  const { data, isFetching } = useGetProductsForSearchPageQuery(
    cleanObject(paramsFromUrl) as IProductSearchQueryParams,
    {
      skip: !isClient,
    }
  );

  const { page, search, q, form } = paramsFromUrl;

  // --- Decompress filters ---
  const rawCompressed =
    typeof q === "string"
      ? decompressBase64UrlToObject<{
          subCategory?: string;
          brand?: string;
          sort?: string;
          priceMin?: number;
          priceMax?: number;
        }>(q)
      : null;

  // --- Normalize params ---
  const derivedParams: ISearchPageForm = useMemo(() => {
    return {
      page,
      search,
      sort: rawCompressed?.sort || "-" + ProductSortOptions[1].value,
      priceMin: rawCompressed?.priceMin ?? 0,
      priceMax: rawCompressed?.priceMax ?? 50000,
      subCategory: csvToBooleanRecord(rawCompressed?.subCategory),
      brand: csvToBooleanRecord(rawCompressed?.brand),
    };
  }, [page, search, rawCompressed]);

  // --- RHF (for UI only) ---
  const { control, handleSubmit, setValue, watch, getValues, reset } =
    useForm<ISearchPageForm>({
      defaultValues: {},
    });

  useEffect(() => {
    if (isClient) {
      if (!form) {
        reset(derivedParams);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, reset, form]);

  // --- Handlers ---
  const onSubmit = () => {
    const values = getValues();

    const updatedQuery = buildSearchQueryParams({
      ...values,
      page: 1,
      subCategory: booleanRecordToCsv(values.subCategory),
      brand: booleanRecordToCsv(values.brand),
      form: true,
    });
    router.push(buildUrlWithParams(path, updatedQuery));
  };

  const changePage = (page: number) => {
    const values = getValues();
    setValue("page", page);
    const updatedQuery = buildSearchQueryParams({
      ...values,
      page,
      subCategory: booleanRecordToCsv(values.subCategory),
      brand: booleanRecordToCsv(values.brand),
      form: true,
    });
    router.push(buildUrlWithParams(path, updatedQuery));
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    watchedValues: watch(),
    setValue,
    changePage,
    products: data?.data?.products ?? [],
    brands: data?.data?.brands ?? [],
    queryMeta: data?.data?.queryMeta,
    isFetching,
  };
};
