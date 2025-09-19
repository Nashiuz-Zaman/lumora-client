"use client";

// React & Next.js
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Utils
import {
  getQueryParamsFromSearchParams,
  cleanObject,
  buildUrlWithParams,
  cleanStatusParam,
} from "@/utils";
import isEqual from "lodash/isEqual";

// Constants
import { ProductSortOptions } from "@/constants/product";

// API Hooks
import { useGetProductsAdminQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { IQueryMeta } from "@/types";

// Types
export interface IProductQueriesParams {
  page: number;
  sort: string;
  search: string;
  status?: number | "all";
  topCategory?: string;
}

export const useProductsQueries = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  // Memoize raw query params
  const rawQueryParams = useMemo(
    () =>
      getQueryParamsFromSearchParams(searchParams, [
        "page",
        "search",
        "sort",
        "status",
        "topCategory",
      ]),
    [searchParams]
  );

  // Normalize params safely
  const finalQueryParams: IProductQueriesParams = useMemo(
    () => ({
      page: Number(rawQueryParams.page) || 1,
      sort:
        (rawQueryParams.sort as string) || "-" + ProductSortOptions[1].value,
      search: (rawQueryParams.search as string) || "",
      status: rawQueryParams.status
        ? cleanStatusParam(rawQueryParams.status as string)
        : undefined,
      topCategory: rawQueryParams.topCategory
        ? (rawQueryParams.topCategory as string)
        : undefined,
    }),
    [rawQueryParams]
  );

  // Controlled form params
  const [formParams, setFormParams] =
    useState<IProductQueriesParams>(finalQueryParams);

  // Sync state only when query params truly change
  useEffect(() => {
    if (!isEqual(formParams, finalQueryParams)) {
      setFormParams(finalQueryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalQueryParams]);

  // Update URL params
  const updateQueryParams = (page?: number) => {
    router.push(
      buildUrlWithParams(path, {
        ...cleanObject(formParams),
        ...(page ? { page } : {}),
      })
    );
  };

  // Handle filter form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQueryParams(1);
  };

  // Handle pagination
  const changePage = (page: number) => {
    if (page !== formParams.page) {
      updateQueryParams(page);
    }
  };

  // Fetch products
  const queryArgs = useMemo(
    () =>
      cleanObject({
        ...finalQueryParams,
        limitFields:
          "defaultImage,title,status,brand,defaultPrice,totalVariants,totalStock,updatedAt",
      }),
    [finalQueryParams]
  );

  const query = useGetProductsAdminQuery(queryArgs);

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    products: query?.data?.data?.products ?? [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject(finalQueryParams),
  };
};
