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
import { useGetPaymentsQuery } from "@/libs/redux/apiSlices/payment/paymentApiSlice";

// Types
import { IQueryMeta } from "@/types";
import { IPayment } from "@/types/payment";
import { TPaymentType } from "@/constants";

export interface IPaymentQueriesParams {
  page: number;
  sort: string;
  search: string;
  type: TPaymentType;
}

export interface IUsePaymentQueriesArgs {
  transactionType: TPaymentType;
  limit?: number;
  extraLimitFields?: (keyof IPayment)[];
}

export const usePaymentQueries = ({
  transactionType,
  limit = 20,
  extraLimitFields = [],
}: IUsePaymentQueriesArgs) => {
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
  const finalQueryParams: IPaymentQueriesParams = useMemo(
    () => ({
      page: Number(rawQueryParams.page) || 1,
      sort: (rawQueryParams.sort as string) || "-" + OrderSortOptions[2].value,
      search: (rawQueryParams.search as string) || "",
      type: transactionType,
    }),
    [rawQueryParams, transactionType]
  );

  // Controlled form params
  const [formParams, setFormParams] =
    useState<IPaymentQueriesParams>(finalQueryParams);

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
      "createdAt",
      "amount",
      "cardType",
      ...extraLimitFields,
    ];
    return cleanObject({
      ...finalQueryParams,
      limit,
      limitFields: limitFields.join(","),
    });
  }, [finalQueryParams, limit, extraLimitFields]);

  // Fetch orders
  const query = useGetPaymentsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
    skip: !isClient,
  });

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    payments: query?.data?.data?.payments ?? [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject(finalQueryParams),
  };
};
