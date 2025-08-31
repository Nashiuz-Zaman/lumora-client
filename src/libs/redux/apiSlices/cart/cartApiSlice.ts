import { baseApiSlice } from "../baseApiSlice";

export const cartApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserCart: builder.mutation({
      query: (newCartData) => ({
        url: "/carts/user-cart",
        method: "POST",
        data: newCartData,
      }),
    }),

    createGuestCart: builder.mutation({
      query: (newCartData) => ({
        url: "/carts/guest-cart",
        method: "POST",
        data: newCartData,
      }),
    }),

    // New query to fetch user cart
    getUserCart: builder.query({
      query: () => ({
        url: "/carts/user-cart/fetch-or-merge",
        method: "POST",
      }),
    }),

    // New query to fetch guest cart
    getGuestCart: builder.query({
      query: () => ({
        url: "/carts/guest-cart",
        method: "GET",
      }),
    }),

    // Delete (clear) user cart
    clearUserCart: builder.mutation({
      query: () => ({
        url: "/carts/user-cart",
        method: "DELETE",
      }),
    }),

    // Delete (clear) guest cart
    clearGuestCart: builder.mutation({
      query: () => ({
        url: "/carts/guest-cart",
        method: "DELETE",
      }),
    }),

    updateUserCart: builder.mutation({
      query: (updatedCartData) => ({
        url: "/carts/user-cart",
        method: "PATCH",
        data: updatedCartData,
      }),
    }),

    updateGuestCart: builder.mutation({
      query: (updatedCartData) => ({
        url: "/carts/guest-cart",
        method: "PATCH",
        data: updatedCartData,
      }),
    }),

    applyCouponToUserCart: builder.mutation({
      query: (couponCode: string) => ({
        url: "/carts/user-cart/add-coupon",
        method: "PATCH",
        data: { couponCode },
      }),
    }),
    applyCouponToGuestCart: builder.mutation({
      query: (couponCode: string) => ({
        url: "/carts/guest-cart/add-coupon",
        method: "PATCH",
        data: { couponCode },
      }),
    }),

    // --- REMOVE COUPON ---
    removeCouponFromUserCart: builder.mutation({
      query: () => ({
        url: "/carts/user-cart/remove-coupon",
        method: "PATCH",
      }),
    }),
    removeCouponFromGuestCart: builder.mutation({
      query: () => ({
        url: "/carts/guest-cart/remove-coupon",
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: "throw",
});

export const {
  useCreateUserCartMutation,
  useCreateGuestCartMutation,
  useGetUserCartQuery,
  useGetGuestCartQuery,
  useClearUserCartMutation,
  useClearGuestCartMutation,
  useUpdateUserCartMutation,
  useUpdateGuestCartMutation,
  useApplyCouponToUserCartMutation,
  useApplyCouponToGuestCartMutation,
  useRemoveCouponFromUserCartMutation,
  useRemoveCouponFromGuestCartMutation,
} = cartApiSlice;
