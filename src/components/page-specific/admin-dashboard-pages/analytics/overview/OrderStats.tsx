"use client";

import { useGetOrderStatsQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";
import { IComparison, StatsCard } from "../shared/StatsCard";
import { IAnalyticDateParams } from "@/types";
import { ErrorMessage } from "@/components/shared";

interface IOrderStatsProps {
  dateParams: IAnalyticDateParams;
  className?: string;
}

interface IOrderDataField {
  current?: number;
  comparison?: IComparison;
}

interface IOrderData {
  totalOrders?: IOrderDataField;
  completedOrders?: IOrderDataField;
  cancelledOrders?: IOrderDataField;
  returnedOrders?: IOrderDataField;
  comparisonText?: string;
}

export const OrderStats = ({
  dateParams,
  className = "",
}: IOrderStatsProps) => {
  const { data, isFetching, error } = useGetOrderStatsQuery(dateParams, {
    refetchOnMountOrArgChange: true,
  });

  const orderData: IOrderData | undefined = data?.success
    ? data.data.orderStats
    : undefined;

  if (error) {
    return <ErrorMessage text=" Failed to load order statistics." />;
  }

  return (
    <div
      className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-5 ${className}`}
    >
      <StatsCard
        label="Total Orders"
        value={orderData?.totalOrders?.current}
        comparison={orderData?.totalOrders?.comparison}
        comparisonText={orderData?.comparisonText}
        isLoading={isFetching}
        className="border border-neutral-200"
      />
      <StatsCard
        label="Completed Orders"
        value={orderData?.completedOrders?.current}
        comparison={orderData?.completedOrders?.comparison}
        comparisonText={orderData?.comparisonText}
        isLoading={isFetching}
        className="border border-neutral-200"
      />
      <StatsCard
        negativeField={true}
        label="Cancelled Orders"
        value={orderData?.cancelledOrders?.current}
        comparison={orderData?.cancelledOrders?.comparison}
        comparisonText={orderData?.comparisonText}
        isLoading={isFetching}
        className="border border-neutral-200"
      />
      <StatsCard
        negativeField={true}
        label="Returned Orders"
        value={orderData?.returnedOrders?.current}
        comparison={orderData?.returnedOrders?.comparison}
        comparisonText={orderData?.comparisonText}
        isLoading={isFetching}
        className="border border-neutral-200"
      />
    </div>
  );
};
