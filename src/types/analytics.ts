import { IComparison } from "@/components/page-specific/admin/analytics/shared/StatsCard";

// ---------------------------------------------------------
// PAYMENT COMPARISON STRUCTURE
// Holds current value and comparison object
// ---------------------------------------------------------
export interface IPaymentComparison {
  current: number;
  comparison: IComparison;
}

// ---------------------------------------------------------
// RETURN TYPE FOR GET PAYMENT STATS API
// Includes paid and refunded payments comparisons
// ---------------------------------------------------------
export interface IGetPaymentStatsReturn {
  paidPayments: IPaymentComparison;
  refundedPayments: IPaymentComparison;
  comparisonText?: string;
}

// ---------------------------------------------------------
// ANALYTIC DATE PARAMETERS
// Optional month/year for querying stats
// ---------------------------------------------------------
export interface IAnalyticDateParams {
  month?: number;
  year?: number;
}
