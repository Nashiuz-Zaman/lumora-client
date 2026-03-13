"use client";

import { MetricCard } from "./MetricCard";
import { useGetTotalProductsSoldQuery } from "@/libs/redux/apiSlices/analytics.api.slice";

export const TotalProductsSold = () => {
  const { data, isFetching } = useGetTotalProductsSoldQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <MetricCard
      title="Total Products Sold"
      value={data?.data?.totalProductsSold}
      isLoading={isFetching}
    />
  );
};
