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

// API Hooks
import { useGetCouponsQuery } from "@/libs/redux/apiSlices/coupon/couponApiSlice";

// Types
import { ICoupon, IQueryMeta } from "@/types";
import { CouponSortOptions, TCouponStatus } from "@/constants";

export interface ICouponQueryParams {
  page: number;
  sort: string;
  search: string;
  status?: TCouponStatus;
}

export interface IUseCouponQueryArgs {
  couponStatus?: TCouponStatus;
  limit?: number;
  extraLimitFields?: (keyof ICoupon)[];
}

export const useCouponQuery = ({
  couponStatus,
  limit = 20,
  extraLimitFields = [],
}: IUseCouponQueryArgs) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // Extract page/search/sort from URL
  const rawQueryParams = useMemo(
    () =>
      getQueryParamsFromSearchParams(searchParams, ["page", "search", "sort"]),
    [searchParams]
  );

  // Normalize query params
  const finalQueryParams: ICouponQueryParams = useMemo(
    () => ({
      page: Number(rawQueryParams?.page) || 1,
      sort: (rawQueryParams?.sort as string) || "-" + CouponSortOptions[0],
      search: (rawQueryParams?.search as string) || "",
      status: couponStatus,
    }),
    [rawQueryParams, couponStatus]
  );

  // Controlled form params
  const [formParams, setFormParams] =
    useState<ICouponQueryParams>(finalQueryParams);

  // Keep state in sync with URL
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

  // Submit filter form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQueryParams(1);
  };

  // Change page
  const changePage = (page: number) => {
    if (page !== formParams.page) updateQueryParams(page);
  };

  // Build query args for API
  const queryArgs = useMemo(() => {
    const limitFields: (keyof ICoupon)[] = [
      "code",
      "discountType",
      "discountValue",
      "startDate",
      "expiryDate",
      "usageLimit",
      "usedCount",
      "minimumOrderAmount",
      "createdAt",
      "updatedAt",
      ...extraLimitFields,
    ];

    return cleanObject({
      ...finalQueryParams,
      limit,
      limitFields: limitFields.join(","),
    });
  }, [finalQueryParams, limit, extraLimitFields]);

  // Fetch coupons
  const query = useGetCouponsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
    skip: !isClient,
  });

  return {
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    coupons: query?.data?.data?.coupons ?? [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
    cleanedParams: cleanObject(finalQueryParams),
  };
};
