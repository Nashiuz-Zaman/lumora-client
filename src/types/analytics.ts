import { IComparison } from "@/components/page-specific/admin-dashboard-pages/analytics/shared/StatsCard";

interface IPaymentComparison {
  current: number;
  comparison: IComparison;
}

export interface IGetPaymentStatsReturn {
  paidPayments: IPaymentComparison;
  refundedPayments: IPaymentComparison;
  comparisonText?: string;
}

export interface IAnalyticDateParams {
  month?: number;
  year?: number;
}
