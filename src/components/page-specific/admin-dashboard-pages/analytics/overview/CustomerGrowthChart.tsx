"use client";

import { AreaChart } from "@/components/shared";
import { useGetCustomerGrowthQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";
import { IAnalyticDateParams } from "@/types";

import { generateDynamicTitle } from "@/utils";

interface ICustomerTrendsChartProps {
  dateParams: IAnalyticDateParams;
  className?: string;
}

interface ICustomerData {
  date?: string;
  totalCustomers?: number;
}

export const CustomerTrendsChart = ({
  dateParams,
  className = "",
}: ICustomerTrendsChartProps) => {
  const { data, isLoading } = useGetCustomerGrowthQuery(dateParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const rawChartData: ICustomerData[] = data?.success ? data.data : [];
  const categories = rawChartData.map((item) => item.date || "Unknown");
  const values = rawChartData.map((item) => item.totalCustomers || 0);

  return (
    <AreaChart
      title={generateDynamicTitle("Customers Joined", dateParams)}
      categories={categories}
      data={values}
      color="#22C55E" // Emerald green with darker gradient
      className={className}
      tooltipUnit=""
      isLoading={isLoading}
      seriesName="Customers"
    />
  );
};
