"use client";

import { AreaChart } from "@/components/shared";
import { useGetRevenueTrendsQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";
import { IAnalyticDateParams } from "@/types";

interface IRevenueTrendsChartProps {
  dateParams: IAnalyticDateParams;
  className?: string;
}

export const RevenueTrendsChart = ({
  dateParams,
  className = "",
}: IRevenueTrendsChartProps) => {
  const { data, isFetching } = useGetRevenueTrendsQuery(dateParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  // API returns an array of { date, totalRevenue }
  const rawChartData = data?.success ? (data.data ? data.data : []) : [];

  const categories = rawChartData.map((item) => item.date || "Unknown");
  const values = rawChartData.map((item) => item.totalRevenue ?? 0);

  return (
    <AreaChart
      categories={categories}
      data={values}
      color="#22C55E"
      tooltipUnit=" USD"
      className={className}
      isLoading={isFetching}
      seriesName="Revenue"
    />
  );
};
