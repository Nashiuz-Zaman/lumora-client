import { DonutChart } from "@/components/shared";
import { useGetTopCategorySalesPercentageQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";

export const TopCategorySalesPercentageChart = () => {
  const { data, isLoading } = useGetTopCategorySalesPercentageQuery();

  const chartData = data?.data ?? [];

  // Single pass through the data
  const { categories, values } = chartData.reduce(
    (acc, item) => ({
      categories: [...acc.categories, item.categoryName],
      values: [...acc.values, item.percentage],
    }),
    { categories: [] as string[], values: [] as number[] }
  );

  return (
    <DonutChart
      className="border border-neutral-200 w-full grow"
      data={values}
      labels={categories}
      tooltipUnit="%"
      isLoading={isLoading}
      showLegend
    />
  );
};
