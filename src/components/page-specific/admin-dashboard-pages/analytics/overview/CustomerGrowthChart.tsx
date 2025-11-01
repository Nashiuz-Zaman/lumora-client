"use client";

import { LineChart } from "@/components/shared";
import { useGetCustomerGrowthQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";
import { IAnalyticDateParams } from "@/types";

interface ICustomerTrendsChartProps {
  dateParams: IAnalyticDateParams;
}

interface ICustomerData {
  date?: string;
  totalCustomers?: number;
}

export const CustomerTrendsChart = ({
  dateParams,
}: ICustomerTrendsChartProps) => {
  const { data, isLoading } = useGetCustomerGrowthQuery(dateParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const rawChartData: ICustomerData[] = data?.success ? data.data : [];
  const categories = rawChartData.map((item) => item.date || "Unknown");
  const values = rawChartData.map((item) => item.totalCustomers || 0);

  return (
    <LineChart
      categories={categories}
      data={values}
      className="grow border border-neutral-200"
      tooltipUnit=""
      isLoading={isLoading}
      seriesName="Customers"
    />
  );
};
