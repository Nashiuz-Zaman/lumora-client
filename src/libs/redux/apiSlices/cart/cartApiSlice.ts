import { baseApiSlice } from "../baseApiSlice";

export const cartApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserCart: builder.mutation({
      query: (newCartData) => ({
        url: "/carts/user-cart",
        method: "POST",
        data: newCartData,
      }),
      invalidatesTags: ["UserCartData"],
    }),

    createGuestCart: builder.mutation({
      query: (newCartData) => ({
        url: "/carts/guest-cart",
        method: "POST",
        data: newCartData,
      }),
      invalidatesTags: ["GuestCartData"],
    }),

    // Fetch user cart (POST fetch-or-merge)
    getUserCart: builder.query({
      query: () => ({
        url: "/carts/user-cart/fetch-or-merge",
        method: "POST",
      }),
      providesTags: ["UserCartData"],
    }),

    // Fetch guest cart
    getGuestCart: builder.query({
      query: () => ({
        url: "/carts/guest-cart",
        method: "GET",
      }),
      providesTags: ["GuestCartData"],
    }),

    // Delete (clear) user cart
    clearUserCart: builder.mutation({
      query: () => ({
        url: "/carts/user-cart",
        method: "DELETE",
      }),
      invalidatesTags: ["UserCartData"],
    }),

    // Delete (clear) guest cart
    clearGuestCart: builder.mutation({
      query: () => ({
        url: "/carts/guest-cart",
        method: "DELETE",
      }),
      invalidatesTags: ["GuestCartData"],
    }),

    updateUserCart: builder.mutation({
      query: (updatedCartData) => ({
        url: "/carts/user-cart",
        method: "PATCH",
        data: updatedCartData,
      }),
      invalidatesTags: ["UserCartData"],
    }),

    updateGuestCart: builder.mutation({
      query: (updatedCartData) => ({
        url: "/carts/guest-cart",
        method: "PATCH",
        data: updatedCartData,
      }),
      invalidatesTags: ["GuestCartData"],
    }),

    // --- APPLY COUPON ---
    applyCouponToUserCart: builder.mutation({
      query: (couponCode: string) => ({
        url: "/carts/user-cart/add-coupon",
        method: "PATCH",
        data: { couponCode },
      }),
      invalidatesTags: ["UserCartData"],
    }),

    applyCouponToGuestCart: builder.mutation({
      query: (couponCode: string) => ({
        url: "/carts/guest-cart/add-coupon",
        method: "PATCH",
        data: { couponCode },
      }),
      invalidatesTags: ["GuestCartData"],
    }),

    // --- REMOVE COUPON ---
    removeCouponFromUserCart: builder.mutation<void, void>({
      query: () => ({
        url: "/carts/user-cart/remove-coupon",
        method: "PATCH",
      }),
      invalidatesTags: ["UserCartData"],
    }),

    removeCouponFromGuestCart: builder.mutation<void, void>({
      query: () => ({
        url: "/carts/guest-cart/remove-coupon",
        method: "PATCH",
      }),
      invalidatesTags: ["GuestCartData"],
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
