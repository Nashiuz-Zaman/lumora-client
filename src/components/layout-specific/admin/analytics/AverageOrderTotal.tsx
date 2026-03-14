"use client";

import { formatPrice } from "@/utils/formatPrice";
import { MetricCard } from "./MetricCard";
import { useGetAverageOrderTotalQuery } from "@apiSlices/analytics.api.slice";

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
