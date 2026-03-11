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

export const useCartActions = () => {
  const { user } = useAuthState();
  const { cart } = useCartState();

  // mutations
  const [createUserCart, { isLoading: creatingUser }] =
    useCreateUserCartMutation();

  const [createGuestCart, { isLoading: creatingGuest }] =
    useCreateGuestCartMutation();

  const [updateUserCart, { isLoading: updatingUser }] =
    useUpdateUserCartMutation();

  const [updateGuestCart, { isLoading: updatingGuest }] =
    useUpdateGuestCartMutation();

  // choose correct mutation
  const mutation = user
    ? cart?._id
      ? updateUserCart
      : createUserCart
    : cart?._id
    ? updateGuestCart
    : createGuestCart;

  // mutation loading state
  const isCartMutating =
    creatingUser || creatingGuest || updatingUser || updatingGuest;

  const showCartUpdateSuccessToast = (result: {
    success: boolean;
    message: string;
  }) => {
    if (result?.success) {
      showToast({
        message: result.message,
        position: "top-center",
      });
    }
  };

  const addRemoveProductToCart = catchAsyncGeneral(async (args) => {
    const data = args?.data as ICartAction;

    const result = await mutation(data).unwrap();

    showCartUpdateSuccessToast(result);

    return result;
  });

  return {
    addRemoveProductToCart,
    isCartMutating,
  };
};