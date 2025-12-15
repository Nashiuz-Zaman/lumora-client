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
import { UserStatus } from "@/constants/user";

// API
import { useGetCustomerListQuery } from "@/libs/redux/apiSlices/customer/customerApiSlice";

// Types
import { IQueryMeta } from "@/types";

export type TCustomerStatusValue =
  | (typeof UserStatus)[keyof typeof UserStatus]
  | "all";

export interface ICustomerQueriesParams {
  page: number;
  sort: string;
  search: string;
  status?: TCustomerStatusValue;
}

export interface IUseCustomersQueriesArgs {
  status?: TCustomerStatusValue;
  limit?: number;
  limitFields?: string[];
}

export const useCustomersQueries = ({
  status,
  limit = 10,
  limitFields = [
    "id",
    "userId",
    "image",
    "name",
    "email",
    "phone",
    "createdAt",
    "lastLoginAt",
  ],
}: IUseCustomersQueriesArgs = {}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // -----------------------------
  // Read URL params
  // -----------------------------
  const rawQueryParams = useMemo(
    () =>
      getQueryParamsFromSearchParams(searchParams, [
        "page",
        "search",
        "sort",
        "status",
      ]),
    [searchParams]
  );

  // -----------------------------
  // Normalize params
  // -----------------------------
  const finalQueryParams: ICustomerQueriesParams = useMemo(
    () => ({
      page: Number(rawQueryParams.page) || 1,
      sort: (rawQueryParams.sort as string) || "-createdAt",
      search: (rawQueryParams.search as string) || "",
      status:
        status ??
        (cleanStatusParam(
          rawQueryParams.status,
          Object.values(UserStatus)
        ) as TCustomerStatusValue),
    }),
    [rawQueryParams, status]
  );

  // -----------------------------
  // Controlled form params
  // -----------------------------
  const [formParams, setFormParams] =
    useState<ICustomerQueriesParams>(finalQueryParams);

  useEffect(() => {
    if (!isEqual(formParams, finalQueryParams)) {
      setFormParams(finalQueryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalQueryParams]);

  // -----------------------------
  // URL update helpers
  // -----------------------------
  const updateQueryParams = (page?: number) => {
    router.push(
      buildUrlWithParams(pathname, {
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
    if (page !== formParams.page) {
      updateQueryParams(page);
    }
  };

  // -----------------------------
  // Build RTK query args
  // -----------------------------
  const queryArgs = useMemo(
    () =>
      cleanObject({
        ...finalQueryParams,
        limit,
        limitFields: limitFields.join(","),
      }),
    [finalQueryParams, limit, limitFields]
  );

  // -----------------------------
  // Fetch customers
  // -----------------------------
  const query = useGetCustomerListQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
    skip: !isClient,
  });

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    customers: query?.data?.data?.customers ?? [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject(finalQueryParams),
  };
};
