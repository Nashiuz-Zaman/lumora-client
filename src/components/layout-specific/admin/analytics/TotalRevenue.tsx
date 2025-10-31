"use client";

import { MetricCard } from "./MetricCard";
import { formatPrice } from "@/utils";
import { useGetTotalRevenueQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";

export const TotalRevenue = () => {
  const { data, isFetching } = useGetTotalRevenueQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <MetricCard
      title="Total Revenue"
      value={data?.data?.revenue}
      isLoading={isFetching}
      formatter={formatPrice}
      gradientText={true}
    />
  );
};
