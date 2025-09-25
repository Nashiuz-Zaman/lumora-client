"use client";

import {
  useCreateUserCartMutation,
  useCreateGuestCartMutation,
  useUpdateUserCartMutation,
  useUpdateGuestCartMutation,
} from "@/libs/redux/apiSlices/cart/cartApiSlice";
import { useCartState } from "./useCartState";
import { useAuthState } from "./useAuthState";
import { catchAsyncGeneral, showToast } from "@/utils";
import { ICartAction } from "@/types/cart";
import { useEffect, useMemo } from "react";

export const useCartActions = () => {
  const { user } = useAuthState();
  const { cart, setIsCartLoading, isCartLoading } = useCartState();

  // mutations
  const [createUserCart, { isLoading: creatingUser }] =
    useCreateUserCartMutation();
  const [createGuestCart, { isLoading: creatingGuest }] =
    useCreateGuestCartMutation();
  const [updateUserCart, { isLoading: updatingUser }] =
    useUpdateUserCartMutation();
  const [updateGuestCart, { isLoading: updatingGuest }] =
    useUpdateGuestCartMutation();

  // whenever any mutation is running, update the context loading state
  const anyUpdating =
    creatingUser || creatingGuest || updatingUser || updatingGuest;

  useEffect(() => {
    setIsCartLoading(anyUpdating);
  }, [anyUpdating, setIsCartLoading]);

  const getMutation = useMemo(() => {
    if (user) return cart?._id ? updateUserCart : createUserCart;
    return cart?._id ? updateGuestCart : createGuestCart;
  }, [
    user,
    cart?._id,
    updateUserCart,
    createUserCart,
    updateGuestCart,
    createGuestCart,
  ]);

  const showCartUpdateSuccessToast = (result: {
    success: boolean;
    message: string;
  }) => {
    if (result?.success) {
      showToast({ message: result.message, position: "top-center" });
      return true;
    }
    return false;
  };

  const addRemoveProductToCart = catchAsyncGeneral(async (args) => {
    const data = args?.data as ICartAction;
    const mutation = getMutation;
    const result = await mutation(data).unwrap();
    showCartUpdateSuccessToast(result);
    return result;
  });

  // return only the context loading state
  return { addRemoveProductToCart, isCartLoading };
};
