"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductSortOptions } from "@/constants/product";
import { useLazyGetProductsForSearchPageQuery } from "@/libs/redux/apiSlices/products/productsApiSlice";
import {
  getQueryParamsFromSearchParams,
  buildUrlWithParams,
  cleanObject,
} from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { cloneDeep } from "lodash";

// Types
export interface ISearchPageProductsForm {
  page: number;
  sort: string;
  search: string;
  subCategories: Record<string, boolean>;
  brands: Record<string, boolean>;
  priceMin: number | null;
  priceMax: number | null;
}

export const useSearchPageProductsQueries = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [trigger, { data, isFetching }] =
    useLazyGetProductsForSearchPageQuery();

  // Only pick page & search from URL
  const rawQueryParams = getQueryParamsFromSearchParams(searchParams, [
    "page",
    "search",
  ]);

  // Parse query params from URL + defaults for others
  const queryParams: ISearchPageProductsForm = {
    page: rawQueryParams?.page ? Number(rawQueryParams.page) : 1,
    sort: "-" + ProductSortOptions[1].value,
    search: (rawQueryParams.search as string) || "",
    subCategories: {},
    brands: {},
    priceMin: 0,
    priceMax: 50000,
  };

  // Load from localStorage regarding categories
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("searchFilters");
    if (stored) {
      const parsed = JSON.parse(stored);
      queryParams.subCategories = parsed.subCategories || {};
      queryParams.brands = parsed.brands || {};
    }
  }

  const { control, handleSubmit, watch, setValue } =
    useForm<ISearchPageProductsForm>({
      defaultValues: queryParams,
    });

  const watchedValues = watch();
  const subCategories = watchedValues.subCategories;
  const brands = watchedValues.brands;

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true);
      return;
    }
    localStorage.setItem(
      "searchFilters",
      JSON.stringify({ subCategories, brands })
    );
  }, [hydrated, subCategories, brands]);

  // Build query for API
  const buildQueryParams = useCallback(
    () => ({
      page: watchedValues.page,
      sort: watchedValues.sort,
      search: watchedValues.search,
      subCategory: Object.entries(subCategories)
        .filter(([, v]) => v)
        .map(([slug]) => slug)
        .join(","),
      brand: Object.entries(brands)
        .filter(([, v]) => v)
        .map(([brand]) => brand)
        .join(","),
      priceMin: watchedValues.priceMin ?? undefined,
      priceMax: watchedValues.priceMax ?? undefined,
    }),
    [
      brands,
      subCategories,
      watchedValues.page,
      watchedValues.sort,
      watchedValues.search,
      watchedValues.priceMax,
      watchedValues.priceMin,
    ]
  );

  // only sync page & search to URL
  const updateQueryParams = (page?: number) => {
    router.push(
      buildUrlWithParams(path, {
        page: page ?? 1,
        search: watchedValues.search || undefined,
      })
    );
  };

  const onSubmit = () => {
    updateQueryParams();
    trigger({ ...cloneDeep(cleanObject(buildQueryParams())), page: 1 });
  };

  const changePage = (page: number) => {
    setValue("page", page);
    updateQueryParams(page);
    trigger(cleanObject(buildQueryParams()));
  };

  useEffect(() => {
    if (hydrated) {
      trigger(cleanObject(buildQueryParams()));
    }
    // this should run only once so suppressing this warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, trigger]);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    watchedValues,
    setValue,
    changePage,
    products: data?.data?.products ?? [],
    brands: data?.data?.brands ?? [],
    queryMeta: data?.data?.queryMeta,
    isFetching,
    cleanedParams: cleanObject(buildQueryParams()),
  };
};
