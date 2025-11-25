import {
  IApiResponse,
  ICancelOrdersAdminArgs,
  ICancelOrdersCustomerArgs,
  IMarkOrderShippedArgs,
  IOrder,
  TQueryDataWithQueryMeta,
} from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { IOrderQueriesParams } from "@/hooks";

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

    getOrdersPrivate: builder.query<
      IApiResponse<TQueryDataWithQueryMeta<{ orders: IOrder[] }>>,
      Partial<IOrderQueriesParams>
    >({
      query: (params) => ({
        url: "/orders/admin",
        method: "GET",
        params: {
          ...params,
        },
      }),
    }),

    getOrdersForCustomer: builder.query<
      IApiResponse<TQueryDataWithQueryMeta<{ orders: IOrder[] }>>,
      Partial<IOrderQueriesParams>
    >({
      query: (params) => ({
        url: "/orders/customers",
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

    cancelOrdersAdmin: builder.mutation<IApiResponse, ICancelOrdersAdminArgs>({
      query: (data) => ({
        url: `/orders/admin/cancel`,
        method: "PATCH",
        data,
      }),
    }),

    cancelOrdersCustomer: builder.mutation<
      IApiResponse,
      ICancelOrdersCustomerArgs
    >({
      query: (data) => ({
        url: `/orders/customer/cancel`,
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

    trackOrder: builder.query<
      IApiResponse<{ order: IOrder & { billingAddress: string } }>,
      { orderId: string }
    >({
      query: (data) => ({
        url: `/orders/track/${data.orderId}`,
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
  useGetOrdersForCustomerQuery,
  useGetCustomerOrderStatsQuery,
  useGetOrdersPrivateQuery,
  useMarkOrderShippedMutation,
  useCancelOrdersAdminMutation,
  useCancelOrdersCustomerMutation,
  useArchiveOrdersMutation,
  useMarkOrdersDeliveredMutation,
  useTrackOrderQuery,
} = orderApiSlice;
