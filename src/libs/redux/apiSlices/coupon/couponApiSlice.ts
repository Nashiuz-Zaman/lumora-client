import { IUseCouponQueryArgs } from "@/hooks";
import { baseApiSlice } from "../baseApiSlice";
import { IApiResponse, ICoupon, TQueryDataWithQueryMeta } from "@/types";

export const couponApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query<
      IApiResponse<TQueryDataWithQueryMeta<{ coupons: ICoupon[] }>>,
      IUseCouponQueryArgs
    >({
      query: (params) => ({
        url: "/coupons",
        method: "GET",
        params,
      }),
    }),

    createCoupon: builder.mutation<IApiResponse<{ coupon: ICoupon }>, ICoupon>({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        data,
      }),
    }),

    expireCoupon: builder.mutation<IApiResponse, { _ids: string[] }>({
      query: (data) => ({
        url: `/coupons/expire`,
        method: "PATCH",
        data,
      }),
    }),

    deleteCoupons: builder.mutation<IApiResponse, { _ids: string[] }>({
      query: (data) => ({
        url: `/coupons/delete`,
        method: "PATCH",
        data,
      }),
    }),
  }),
  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useExpireCouponMutation,
  useDeleteCouponsMutation,
} = couponApiSlice;
