import {
  useCreateUserCartMutation,
  useCreateGuestCartMutation,
  useUpdateUserCartMutation,
  useUpdateGuestCartMutation,
} from "@/libs/redux/apiSlices/cart/cartApiSlice";
import { useCartState } from "./useCartState";
import { useAuthState } from "./useAuthState";
import { catchAsyncGeneral, showToast, TWithEvent } from "@/utils";
import { ICartAction } from "@/types/cart";
import { useEffect } from "react";

export const useCartActions = () => {
  const { user } = useAuthState();
  const { cart, setIsCartLoading } = useCartState();

  const [createUserCart, { isLoading: isCreatingUserCart }] =
    useCreateUserCartMutation();
  const [createGuestCart, { isLoading: isCreatingGuestCart }] =
    useCreateGuestCartMutation();
  const [updateUserCart, { isLoading: isUpdatingUserCart }] =
    useUpdateUserCartMutation();
  const [updateGuestCart, { isLoading: isUpdatingGuestCart }] =
    useUpdateGuestCartMutation();

  const isCartUpdating =
    isCreatingUserCart ||
    isCreatingGuestCart ||
    isUpdatingUserCart ||
    isUpdatingGuestCart;

  useEffect(() => {
    setIsCartLoading(isCartUpdating);
  }, [isCartUpdating, setIsCartLoading]);

  const showCartUpdateSuccessToast = (result: {
    success: boolean;
    message: string;
  }) => {
    if (result.success) {
      showToast({ message: result.message, position: "top-center" });
      return true;
    }
  };

  const createOrUpdateCart = async (actionData: ICartAction) => {
    if (cart?._id && user) {
      return await updateUserCart(actionData).unwrap();
    }
    if (!cart?._id && user) {
      return await createUserCart(actionData).unwrap();
    }
    if (cart?._id && !user) {
      return await updateGuestCart(actionData).unwrap();
    }
    return await createGuestCart(actionData).unwrap();
  };

  const addRemoveProductToCart = catchAsyncGeneral(async (args) => {
    const data = args?.data as ICartAction;
    const { productId, variantId, action, quantity } = data;

    const actionData: ICartAction = {
      productId,
      variantId,
      action,
      quantity,
    };

    const result = await createOrUpdateCart(actionData);
    showCartUpdateSuccessToast(result);
    return result;
  });

  return {
    addRemoveProductToCart,
    isCartUpdating,
  };
};
