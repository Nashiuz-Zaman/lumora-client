import { baseApiSlice } from "../baseApiSlice";
import {
  IAnalyticDateParams,
  IApiResponse,
  IGetPaymentStatsReturn,
} from "@/types";

export const analyticsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStats: builder.query<IApiResponse<any>, IAnalyticDateParams>({
      query: (params) => ({
        url: "/analytics/order-stats",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getPaymentStats: builder.query<
      IApiResponse<{ paymentStats: IGetPaymentStatsReturn }>,
      IAnalyticDateParams
    >({
      query: (params) => ({
        url: "/analytics/payment-stats",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getTotalRevenue: builder.query<IApiResponse<{ revenue: number }>, void>({
      query: () => ({
        url: "/analytics/total-revenue",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getOrderTrendsCombined: builder.query<
      IApiResponse<{
        placedTrends: { date: string; totalOrders: number }[];
        cancelledTrends: { date: string; totalOrders: number }[];
      }>,
      IAnalyticDateParams
    >({
      query: (params) => ({
        url: "/analytics/order/trends",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getRevenueTrends: builder.query<
      IApiResponse<{ date: string; totalRevenue: number }[]>,
      IAnalyticDateParams
    >({
      query: (params) => ({
        url: "/analytics/revenue/trends",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getTotalCustomers: builder.query<
      IApiResponse<{ totalCustomers: number }>,
      void
    >({
      query: () => ({
        url: "/analytics/total-customers",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getTotalProductsSold: builder.query<
      IApiResponse<{ totalProductsSold: number }>,
      void
    >({
      query: () => ({
        url: "/analytics/total-products-sold",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getCustomerGrowth: builder.query<IApiResponse<any>, IAnalyticDateParams>({
      query: (params) => ({
        url: "/analytics/customer/trends",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getTopCategorySalesPercentage: builder.query<
      IApiResponse<
        {
          categoryName: string;
          percentage: number;
        }[]
      >,
      void
    >({
      query: () => ({
        url: "/analytics/top-category-sales-percentage",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getTopSellingProducts: builder.query<
      IApiResponse<any>,
      IAnalyticDateParams
    >({
      query: (params) => ({
        url: "/analytics/top-selling-products",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getLowTotalStockProducts: builder.query<IApiResponse<any>, void>({
      query: (params) => ({
        url: "/analytics/low-total-stock-products",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getLowVariantStockProducts: builder.query<IApiResponse<any>, void>({
      query: (params) => ({
        url: "/analytics/low-variant-stock-products",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getAverageOrderTotal: builder.query<
      IApiResponse<{ averageOrderTotal: number }>,
      void
    >({
      query: () => ({
        url: "/analytics/average-order-total",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getRecentPayments: builder.query<IApiResponse<any>, IAnalyticDateParams>({
      query: (params) => ({
        url: "/analytics/recent-payments",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const {
  useGetOrderStatsQuery,
  useGetPaymentStatsQuery,
  useGetTotalRevenueQuery,
  useGetTotalProductsSoldQuery,
  useGetTotalCustomersQuery,
  useGetRevenueTrendsQuery,
  useGetCustomerGrowthQuery,
  useGetTopCategorySalesPercentageQuery,
  useGetAverageOrderTotalQuery,
  useGetTopSellingProductsQuery,
  useGetLowTotalStockProductsQuery,
  useGetLowVariantStockProductsQuery,
  useGetRecentPaymentsQuery,
  useGetOrderTrendsCombinedQuery
} = analyticsApiSlice;
