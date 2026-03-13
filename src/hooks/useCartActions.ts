"use client";

import {
  useAddItemToCartMutation,
  useUpdateCartItemQtyMutation,
  useRemoveItemFromCartMutation,
  useClearCartMutation,
  useAddCouponToCartMutation,
  useRemoveCouponFromCartMutation,
  TCartResponse,
  IAddItemToCartRequest,
  IUpdateCartQtyRequest,
  IRemoveCartItemRequest,
  IAddCouponRequest,
} from "@/libs/redux/apiSlices/cart.api.slice";

import { catchAsyncGeneral, showToast } from "@/utils";

export const useCartActions = () => {
  /* ---------------- MUTATIONS ---------------- */

  const [addItemToCart, { isLoading: adding }] = useAddItemToCartMutation();

  const [updateCartItemQty, { isLoading: updating }] =
    useUpdateCartItemQtyMutation();

  const [removeItemFromCart, { isLoading: removing }] =
    useRemoveItemFromCartMutation();

  const [clearCart, { isLoading: clearing }] = useClearCartMutation();

  const [addCouponToCart, { isLoading: applyingCoupon }] =
    useAddCouponToCartMutation();

  const [removeCouponFromCart, { isLoading: removingCoupon }] =
    useRemoveCouponFromCartMutation();

  /* ---------------- LOADING STATE ---------------- */

  const isCartMutating =
    adding ||
    updating ||
    removing ||
    clearing ||
    applyingCoupon ||
    removingCoupon;

  /* ---------------- TOAST ---------------- */

  const showCartUpdateSuccessToast = (result: TCartResponse) => {
    if (result?.success && result?.message) {
      showToast({
        message: result.message,
        position: "top-center",
      });
    }
  };

  /* ---------------- ACTIONS ---------------- */

  const addProductToCart = catchAsyncGeneral(async (args) => {
    const data = args?.data as IAddItemToCartRequest;
    const result = await addItemToCart(data).unwrap();
    showCartUpdateSuccessToast(result);
  });

  const updateCartItemQuantity = catchAsyncGeneral(async (args) => {
    const data = args?.data as IUpdateCartQtyRequest;
    const result = await updateCartItemQty(data).unwrap();
    showCartUpdateSuccessToast(result);
  });

  const removeCartItem = catchAsyncGeneral(async (args) => {
    const data = args?.data as IRemoveCartItemRequest;
    const result = await removeItemFromCart(data).unwrap();
    showCartUpdateSuccessToast(result);
  });

  const clearUserCart = catchAsyncGeneral(async () => {
    const result = await clearCart().unwrap();
    showCartUpdateSuccessToast(result);
  });

  const applyCoupon = catchAsyncGeneral(
    async (args) => {
      const data = args?.data as IAddCouponRequest;

      const result = await addCouponToCart(data).unwrap();
      showCartUpdateSuccessToast(result);
    },
    {
      handleError: "throw",
    },
  );

  const removeCoupon = catchAsyncGeneral(
    async () => {
      const result = await removeCouponFromCart().unwrap();
      showCartUpdateSuccessToast(result);
    },
    {
      handleError: "throw",
    },
  );

  return {
    addProductToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearUserCart,
    applyCoupon,
    removeCoupon,
    isCartMutating,
  };
};
