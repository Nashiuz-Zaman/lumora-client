import {
  IApiResponse,
  ICancelOrdersAdminArgs,
  IMarkOrderShippedArgs,
} from "@/types";
import { baseApiSlice } from "../baseApiSlice";

export const orderApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
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
          limitFields:
            "orderId,name,email,phone,updatedAt,total,status,estimatedDelivery",
          ...params,
        },
      }),
    }),

    initiateSslPayment: builder.mutation({
      query: (data) => ({
        url: "/orders/initiate-payment",
        method: "POST",
        data,
      }),
    }),

    markOrderShipped: builder.mutation<IApiResponse, IMarkOrderShippedArgs>({
      query: (data) => ({
        url: `/orders/shipping-details`,
        method: "PATCH",
        data,
      }),
    }),

    cancelOrdersAdmin: builder.mutation<IApiResponse, ICancelOrdersAdminArgs>({
      query: (data) => ({
        url: `/orders/admin-cancel`,
        method: "PATCH",
        data,
      }),
    }),

    deleteOrdersAdmin: builder.mutation({
      query: (data) => ({
        url: "/orders/admin-delete",
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

export const {
  usePlaceOrderMutation,
  useGetCustomerRecentOrdersQuery,
  useGetCustomerOrderHistoryQuery,
  useGetCustomerOrderStatsQuery,
  useGetOrdersPrivateQuery,
  useInitiateSslPaymentMutation,
  useMarkOrderShippedMutation,
  useCancelOrdersAdminMutation,
  useDeleteOrdersAdminMutation,
  useTrackOrderQuery,
} = orderApiSlice;
