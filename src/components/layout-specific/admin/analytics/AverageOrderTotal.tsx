"use client";

import { formatPrice } from "@/utils";
import { MetricCard } from "./MetricCard";
import { useGetAverageOrderTotalQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";

export const AverageOrderTotal = () => {
  const { data, isFetching } = useGetAverageOrderTotalQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <MetricCard
      title="Average Order Total"
      value={data?.data?.averageOrderTotal}
      isLoading={isFetching}
      formatter={formatPrice}
    />
  );
};
