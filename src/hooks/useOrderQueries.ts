"use client";

// React & Next.js
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Utils
import {
  getQueryParamsFromSearchParams,
  cleanObject,
  buildUrlWithParams,
} from "@/utils";
import isEqual from "lodash/isEqual";

// Constants
import { OrderSortOptions } from "@/constants/order";

// API Hooks
import { useGetOrdersPrivateQuery } from "@/libs/redux/apiSlices/orders/orderApiSlice";

// Types
import { TOrderStatusValue } from "@/constants";
import { IOrder, IQueryMeta } from "@/types";

export interface IOrderQueriesParams {
  page: number;
  sort: string;
  search: string;
  status?: TOrderStatusValue;
  isArchived: boolean;
}

export interface IUseOrderQueriesArgs {
  orderStatus?: TOrderStatusValue;
  isArchived?: boolean;
  isPrivate?: boolean;
  limit?: number;
  extraLimitFields?: (keyof IOrder)[];
}

export const useOrderQueries = ({
  orderStatus,
  isArchived = false,
  isPrivate = false,
  limit = 20,
  extraLimitFields = [],
}: IUseOrderQueriesArgs) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize raw query params
  const rawQueryParams = useMemo(
    () =>
      getQueryParamsFromSearchParams(searchParams, ["page", "search", "sort"]),
    [searchParams]
  );

  // Normalize params safely
  const finalQueryParams: IOrderQueriesParams = useMemo(
    () => ({
      page: Number(rawQueryParams.page) || 1,
      sort: (rawQueryParams.sort as string) || "-" + OrderSortOptions[2].value,
      search: (rawQueryParams.search as string) || "",
      status: orderStatus,
      isArchived,
    }),
    [rawQueryParams, orderStatus, isArchived]
  );

  // Controlled form params
  const [formParams, setFormParams] =
    useState<IOrderQueriesParams>(finalQueryParams);

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

  // Build query args
  const queryArgs = useMemo(() => {
    const limitFields = [
      "orderId",
      "name",
      "email",
      "phone",
      "updatedAt",
      "total",
      "status",
      "invoice",
      "estimatedDelivery",
      ...extraLimitFields,
    ];

    return cleanObject({
      ...finalQueryParams,
      limit,
      limitFields: limitFields.join(","),
    });
  }, [finalQueryParams, limit, extraLimitFields]);

  // Fetch orders
  const query = useGetOrdersPrivateQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
    skip: !isClient || !isPrivate,
  });

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    orders: query?.data?.data?.orders ?? [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject(finalQueryParams),
  };
};
