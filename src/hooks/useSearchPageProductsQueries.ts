"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductSortOptions } from "@/constants/product";
import { useLazyGetProductsForSearchPageQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import {
  buildUrlWithParams,
  cleanObject,
  csvToBooleanRecord,
  getQueryParamsFromSearchParams,
  compressObjectToBase64Url,
  decompressBase64UrlToObject,
} from "@/utils";

import { useCallback, useEffect, useState } from "react";

// Types
interface ICompressedParams {
  subCategory: Record<string, boolean>;
  brands: Record<string, boolean>;
  sort: string;
  priceMin: number;
  priceMax: number;
}

export interface ISearchPageForm extends ICompressedParams {
  page: number;
  search?: string;
}

export interface IGetProductsForSearchPageQueryParams {
  page: number;
  search?: string;
  q?: string;
}

export const useSearchPageProductsQueries = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [trigger, { data, isFetching }] =
    useLazyGetProductsForSearchPageQuery();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // --- Parse query params from URL ---
  const { page, search, q } = getQueryParamsFromSearchParams(searchParams, [
    "page",
    "search",
    "q",
  ]);

  // --- Decompress filters if present ---
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

  // --- Normalize into form-friendly structure ---
  const initialParams: ISearchPageForm = {
    page: typeof page === "number" ? page : parseInt(page as string) || 1,
    search: typeof search === "string" ? search : "",
    sort: rawCompressed?.sort || "-" + ProductSortOptions[1].value,
    priceMin: rawCompressed?.priceMin ?? 0,
    priceMax: rawCompressed?.priceMax ?? 50000,
    subCategory: csvToBooleanRecord(rawCompressed?.subCategory),
    brands: csvToBooleanRecord(rawCompressed?.brand),
  };

  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<ISearchPageForm>({
      defaultValues: initialParams,
    });
  console.log(watch());
  // --- Build compressed query params for URL/API ---
  const buildQueryParams = useCallback(
    (pageOverride?: number) => {
      const values = getValues();

      const qObj = cleanObject({
        subCategory: Object.entries(values.subCategory)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(","),
        brand: Object.entries(values.brands)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(","),
        priceMin: values.priceMin,
        priceMax: values.priceMax,
        sort: values.sort,
      });

      return cleanObject({
        page: pageOverride ?? values.page,
        search: values.search,
        q: compressObjectToBase64Url(qObj),
      }) as IGetProductsForSearchPageQueryParams;
    },
    [getValues]
  );

  // --- Initial fetch ---
  useEffect(() => {
    if (isClient) trigger(buildQueryParams());
    // this should run only once so below comment is ok
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  // --- Form submission handler ---
  const onSubmit = () => {
    const queryParams = { ...buildQueryParams(1) };
    router.push(buildUrlWithParams(path, queryParams));
    trigger(queryParams);
  };

  // --- Page change handler ---
  const changePage = (page: number) => {
    setValue("page", page);
    const queryParams = { ...buildQueryParams(page) };
    router.push(buildUrlWithParams(path, queryParams));
    trigger(queryParams);
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
    cleanedParams: cleanObject(buildQueryParams()),
  };
};
