import { baseApiSlice } from "./base.api.slice";
import { IApiResponse } from "@/types";
import { TPopulatedCart } from "@/types/cart";
import { TAppDispatch } from "../store";

/* --------------------------------------------------------- */
/* REQUEST TYPES */
/* --------------------------------------------------------- */

export interface IAddItemToCartRequest {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface IUpdateCartQtyRequest {
  cartItemId: string;
  quantity: number;
}

export interface IRemoveCartItemRequest {
  cartItemId: string;
}

export interface IAddCouponRequest {
  couponCode: string;
}

/* --------------------------------------------------------- */
/* RESPONSE TYPES */
/* --------------------------------------------------------- */

export type TCartResponse = IApiResponse<{
  cart: TPopulatedCart;
}>;

const seedCart = (dispatch: TAppDispatch, cart: TPopulatedCart) => {
  dispatch(
    cartApiSlice.util.upsertQueryData("getCart", undefined, {
      success: true,
      status: "success",
      data: { cart },
    }),
  );
};

const handleCartSuccess = async (
  _arg: unknown,
  {
    dispatch,
    queryFulfilled,
  }: {
    dispatch: TAppDispatch;
    queryFulfilled: Promise<{ data: TCartResponse }>;
  },
) => {
  try {
    const { data } = await queryFulfilled;

    const cart = data?.data?.cart;

    if (cart) {
      seedCart(dispatch, cart);
    }
  } catch (err) {
    console.log("Cart cache sync failed:", err);
  }
};

/* --------------------------------------------------------- */
/* CART API SLICE */
/* --------------------------------------------------------- */

export const cartApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- GET CART ---------------- */

    getCart: builder.query<TCartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),

    /* ---------------- ADD ITEM ---------------- */

    addItemToCart: builder.mutation<TCartResponse, IAddItemToCartRequest>({
      query: (body) => ({
        url: "/cart/item",
        method: "POST",
        body,
      }),
      onQueryStarted: handleCartSuccess,
    }),

    /* ---------------- UPDATE ITEM QTY ---------------- */

    updateCartItemQty: builder.mutation<TCartResponse, IUpdateCartQtyRequest>({
      query: ({ cartItemId, quantity }) => ({
        url: `/cart/item/${cartItemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      onQueryStarted: handleCartSuccess,
    }),

    /* ---------------- REMOVE ITEM ---------------- */

    removeItemFromCart: builder.mutation<TCartResponse, IRemoveCartItemRequest>(
      {
        query: ({ cartItemId }) => ({
          url: `/cart/item/${cartItemId}`,
          method: "DELETE",
        }),
        onQueryStarted: handleCartSuccess,
      },
    ),

    /* ---------------- CLEAR CART ---------------- */

    clearCart: builder.mutation<TCartResponse, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      onQueryStarted: handleCartSuccess,
    }),

    /* ---------------- ADD COUPON ---------------- */

    addCouponToCart: builder.mutation<TCartResponse, IAddCouponRequest>({
      query: ({ couponCode }) => ({
        url: "/cart/coupon",
        method: "POST",
        body: { couponCode },
      }),
      onQueryStarted: handleCartSuccess,
    }),

    /* ---------------- REMOVE COUPON ---------------- */

    removeCouponFromCart: builder.mutation<TCartResponse, void>({
      query: () => ({
        url: "/cart/coupon",
        method: "DELETE",
      }),
      onQueryStarted: handleCartSuccess,
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useUpdateCartItemQtyMutation,
  useRemoveItemFromCartMutation,
  useClearCartMutation,
  useAddCouponToCartMutation,
  useRemoveCouponFromCartMutation,
} = cartApiSlice;
