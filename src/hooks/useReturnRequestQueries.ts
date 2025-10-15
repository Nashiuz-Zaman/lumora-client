"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import isEqual from "lodash/isEqual";

// Utils
import {
  getQueryParamsFromSearchParams,
  cleanObject,
  buildUrlWithParams,
} from "@/utils";

// API Hook
import { useGetReturnRequestsQuery } from "@/libs/redux/apiSlices/returnRequest/returnRequestApiSlice";

// Types
import { IQueryMeta, IReturnRequest } from "@/types";
import { ReturnRequestSortOptions, TReturnRequestStatus } from "@/constants";

export interface IReturnRequestQueriesParams {
  page: number;
  sort: string;
  search: string;
  status: TReturnRequestStatus;
}

export interface IUseReturnRequestQueriesArgs {
  requestStatus: TReturnRequestStatus;
  limit?: number;
  extraLimitFields?: (keyof IReturnRequest)[];
}

export const useReturnRequestQueries = ({
  requestStatus,
  limit = 20,
  extraLimitFields = [],
}: IUseReturnRequestQueriesArgs) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract URL params
  const rawQueryParams = useMemo(
    () =>
      getQueryParamsFromSearchParams(searchParams, ["page", "search", "sort"]),
    [searchParams]
  );

  // Normalize query params
  const finalQueryParams: IReturnRequestQueriesParams = useMemo(
    () => ({
      page: Number(rawQueryParams.page) || 1,
      sort:
        (rawQueryParams.sort as string) ||
        "-" + ReturnRequestSortOptions[2].value,
      search: (rawQueryParams.search as string) || "",
      status: requestStatus,
    }),
    [rawQueryParams, requestStatus]
  );

  // Controlled form state
  const [formParams, setFormParams] =
    useState<IReturnRequestQueriesParams>(finalQueryParams);

  // Sync with URL params
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQueryParams(1);
  };

  const changePage = (page: number) => {
    if (page !== formParams.page) updateQueryParams(page);
  };

  // Build query args
  const queryArgs = useMemo(() => {
    const limitFields: (keyof IReturnRequest)[] = [
      "_id",
      "orderId",
      "name",
      "email",
      "phone",
      "total",
      "reason",
      "status",
      "createdAt",
      "updatedAt",
      "invoice",
      ...extraLimitFields,
    ];

    return cleanObject({
      ...finalQueryParams,
      limit,
      sort: "-createdAt",
      limitFields: limitFields.join(","),
    });
  }, [finalQueryParams, limit, extraLimitFields]);

  // Fetch data
  const query = useGetReturnRequestsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
    skip: !isClient,
  });

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    returnRequests: query?.data?.data?.returnRequests ?? [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject(finalQueryParams),
  };
};
