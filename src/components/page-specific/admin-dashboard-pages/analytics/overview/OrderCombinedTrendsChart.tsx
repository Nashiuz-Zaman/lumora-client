"use client";

import { ColumnChartDual } from "@/components/shared";
import { useGetOrderTrendsCombinedQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";
import { IAnalyticDateParams } from "@/types";
import { generateDynamicTitle } from "@/utils/generateDynamicTitle";

interface IOrderTrendsChartProps {
  dateParams: IAnalyticDateParams;
  className?: string;
}

export const OrderCombinedTrendsChart = ({
  dateParams,
}: IOrderTrendsChartProps) => {
  const { data, isLoading } = useGetOrderTrendsCombinedQuery(dateParams, {
    refetchOnMountOrArgChange: true,
  });

  const placedTrends = data?.success ? data.data!.placedTrends : [];
  const cancelledTrends = data?.success ? data.data!.cancelledTrends : [];

  // Extract the categories (dates)
  const categories = placedTrends.map((item) => item.date);

  const series = [
    {
      name: "Placed Orders",
      data: placedTrends.map((item) => item.totalOrders || 0),
    },
    {
      name: "Cancelled Orders",
      data: cancelledTrends.map((item) => item.totalOrders || 0),
    },
  ];

  return (
    <ColumnChartDual
      title={generateDynamicTitle("Order Trends", dateParams)}
      labels={categories}
      series={series}
      colors={["#22C55E", "#EF4444"]} 
      className='border border-neutral-200'
      isLoading={isLoading}
    />
  );
};
