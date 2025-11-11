"use client";

import { useGetPaymentStatsQuery } from "@/libs/redux/apiSlices/analytics/analyticsApiSlice";
import { StatsCard } from "../shared/StatsCard";
import { formatPrice } from "@/utils/formatPrice";
import { IAnalyticDateParams } from "@/types";
import { ErrorMessage } from "@/components/shared";

interface IPaymentStatsProps {
  dateParams: IAnalyticDateParams;
  className?: string;
}

export const PaymentStats = ({
  dateParams,
  className = "",
}: IPaymentStatsProps) => {
  const { data, isFetching, error } = useGetPaymentStatsQuery(dateParams, {
    refetchOnMountOrArgChange: true,
  });

  const paymentData = data?.success ? data.data?.paymentStats : undefined;

  if (error) {
    return <ErrorMessage text="Failed to load payment statistics" />;
  }

  return (
    <div
      className={`w-full grid grid-cols-1 gap-5 ${className}`}
    >
      <StatsCard
        label="Payments"
        value={formatPrice(paymentData?.paidPayments.current as number)}
        comparison={paymentData?.paidPayments?.comparison}
        comparisonText={paymentData?.comparisonText}
        isLoading={isFetching}
      />

      <StatsCard
        negativeField
        label="Refunds"
        value={formatPrice(paymentData?.refundedPayments?.current as number)}
        comparison={paymentData?.refundedPayments?.comparison}
        comparisonText={paymentData?.comparisonText}
        isLoading={isFetching}
      />
    </div>
  );
};
