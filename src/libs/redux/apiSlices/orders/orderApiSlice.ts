import {
  IApiResponse,
  ICancelOrdersAdminArgs,
  IMarkOrderShippedArgs,
  IOrder,
} from "@/types";
import { baseApiSlice } from "../baseApiSlice";

export const orderApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<IApiResponse<{ paymentUrl: string }>, IOrder>({
      query: (orderData) => ({
        url: `/orders/`,
        method: "POST",
        data: orderData,
      }),
    }),

    getCustomerRecentOrders: builder.query({
      query: () => ({
        url: "/orders/my/recent",
        method: "GET",
      }),
    }),

    getCustomerOrderHistory: builder.query({
      query: (params) => ({
        url: "/orders/my",
        method: "GET",
        params,
      }),
    }),

    getCustomerOrderStats: builder.query({
      query: () => ({
        url: "/orders/my/stats",
        method: "GET",
      }),
    }),

    getOrdersPrivate: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params: {
          ...params,
        },
      }),
    }),

    markOrderShipped: builder.mutation<IApiResponse, IMarkOrderShippedArgs>({
      query: (data) => ({
        url: `/orders/shipping-details`,
        method: "PATCH",
        data,
      }),
    }),

    markOrdersDelivered: builder.mutation<IApiResponse, { _ids: string[] }>({
      query: (data) => ({
        url: "/orders/delivered",
        method: "PATCH",
        data,
      }),
    }),

    cancelOrders: builder.mutation<IApiResponse, ICancelOrdersAdminArgs>({
      query: (data) => ({
        url: `/orders/cancel`,
        method: "PATCH",
        data,
      }),
    }),

    archiveOrders: builder.mutation<IApiResponse, { _ids: string[] }>({
      query: (data) => ({
        url: "/orders/archive",
        method: "PATCH",
        data,
      }),
    }),

    trackOrder: builder.query({
      query: (orderId) => ({
        url: `/orders/track/${orderId}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const {
  usePlaceOrderMutation,
  useGetCustomerRecentOrdersQuery,
  useGetCustomerOrderHistoryQuery,
  useGetCustomerOrderStatsQuery,
  useGetOrdersPrivateQuery,
  useMarkOrderShippedMutation,
  useCancelOrdersMutation,
  useArchiveOrdersMutation,
  useMarkOrdersDeliveredMutation,
  useTrackOrderQuery,
} = orderApiSlice;
