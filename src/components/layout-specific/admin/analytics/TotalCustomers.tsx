"use client";

import { MetricCard } from "./MetricCard";
import { useGetTotalCustomersQuery } from "@/libs/redux/apiSlices/analytics.api.slice";

export const TotalCustomers = () => {
  const { data, isFetching } = useGetTotalCustomersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <MetricCard
      title="Total Customers"
      value={data?.data?.totalCustomers}
      isLoading={isFetching}
    />
  );
};
