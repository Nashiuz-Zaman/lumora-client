"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getQueryParamsFromSearchParams } from "@/utils/getQueryParamsFromSearchParams";
import { cleanObject } from "@/utils/cleanObject";
import { buildUrlWithParams } from "@/utils/buildUrlWithParams";

import { ProductSortOptions } from "@/constants/product";
import { cleanStatusParam } from "@/utils/statusUtils";
import { useGetProductsAdminQuery } from "@/libs/redux/apiSlices/products/productsApiSlice";

// Types
export interface IAllProductQueryParams {
  page: number;
  sort: string;
  search: string;
  status?: number | "all";
}

export const useAllProductsQueries = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  // raw query params from URL
  const rawQueryParams = getQueryParamsFromSearchParams(searchParams, [
    "page",
    "search",
    "sort",
    "status",
  ]);

  // final normalized query params
  const finalQueryParams: IAllProductQueryParams = useMemo(() => {
    return {
      page: Number(rawQueryParams.page) || 1,
      sort:
        (rawQueryParams.sort as string) || "-" + ProductSortOptions[1].value,
      search: (rawQueryParams.search as string) || "",
      status: cleanStatusParam(rawQueryParams?.status as string),
    };
  }, [rawQueryParams]);

  // controlled form params state
  const [formParams, setFormParams] =
    useState<IAllProductQueryParams>(finalQueryParams);

  const updateQueryParams = (page?: number) => {
    router.push(
      buildUrlWithParams(path, {
        ...cleanObject({ ...formParams }),
        ...(page !== undefined ? { page } : { page: 1 }),
      })
    );
  };

  // handle filter form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQueryParams(); // resets page to 1
  };

  // handle pagination
  const changePage = (page: number) => {
    if (page !== Number(formParams.page)) {
      updateQueryParams(page);
    }
  };

  // fetch products
  const query = useGetProductsAdminQuery(cleanObject({ ...finalQueryParams }), {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    products: query?.data?.data?.products ?? [],
    queryMeta: query?.data?.data?.queryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject({ ...finalQueryParams }),
  };
};
