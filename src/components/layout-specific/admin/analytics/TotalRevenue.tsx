"use client";

import { MetricCard } from "./MetricCard";
import { formatPrice } from "@/utils/formatPrice";
import { useGetTotalRevenueQuery } from "@apiSlices/analytics.api.slice";

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
