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

    getAdminOrders: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params: {
          ...params,
          limitFields:
            "orderId,name,email,updatedAt,orderTotal,status,estimatedDelivery",
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

    markOrderShipped: builder.mutation({
      query: (data) => ({
        url: `/orders/shipping-details`,
        method: "PATCH",
        data,
      }),
    }),

    cancelOrderAdmin: builder.mutation({
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
  useGetAdminOrdersQuery,
  useInitiateSslPaymentMutation,
  useMarkOrderShippedMutation,
  useCancelOrderAdminMutation,
  useDeleteOrdersAdminMutation,
  useTrackOrderQuery,
} = orderApiSlice;
