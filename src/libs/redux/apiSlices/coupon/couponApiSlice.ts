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
      providesTags: ["Coupons"],
    }),

    createCoupon: builder.mutation<IApiResponse, Partial<ICoupon>>({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Coupons"],
    }),

    expireCoupon: builder.mutation<IApiResponse, { _ids: string[] }>({
      query: (data) => ({
        url: `/coupons/expire`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Coupons"],
    }),

    deleteCoupons: builder.mutation<IApiResponse, { _ids: string[] }>({
      query: (data) => ({
        url: `/coupons/delete`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Coupons"],
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
