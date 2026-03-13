"use client";

import { CartItemCard } from "./CartItemCard";
import { CartIcon, LinkBtn, LinkBtnTrans, NoData } from "@/components/shared/";
import { useCartActions, useCartState } from "@/hooks";
import {
  IRemoveCartItemRequest,
  IUpdateCartQtyRequest,
} from "@/libs/redux/apiSlices/cart.api.slice";

export const CartItemList = () => {
  const { cart } = useCartState();
  const { updateCartItemQuantity, removeCartItem, isCartMutating } =
    useCartActions();

  // Updates item qty in a cart
  const updateQuantity = async ({
    cartItemId,
    quantity,
  }: IUpdateCartQtyRequest) => {
    await updateCartItemQuantity({ data: { cartItemId, quantity } });
  };

  // Completely removes the item from the cart
  const removeItem = async (data: IRemoveCartItemRequest) => {
    await removeCartItem(data);
  };

  const cartItems = cart?.items || [];

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grow flex flex-col">
        {!cartItems.length && (
          <div className="grow p-5 rounded-xl flex items-center justify-center">
            <div className="mb-16">
              <NoData text="Cart is empty" className="py-0! my-0! mb-4!" />
              <LinkBtn href="/products/s" className="primaryClasses!">
                <CartIcon className="text-xl" />
                Back to Shopping
              </LinkBtn>
            </div>
          </div>
        )}

        {cartItems?.length > 0 && (
          <div className="space-y-3">
            {cartItems?.map((item, i) => (
              <CartItemCard
                key={`key-${i}`}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                isCartMutating={isCartMutating}
              />
            ))}
          </div>
        )}

        {cartItems?.length > 0 && (
          <div className="mt-auto pt-6">
            <LinkBtnTrans className="text-primary">
              <CartIcon className="text-2xl" />
              Back to Shopping
            </LinkBtnTrans>
          </div>
        )}
      </div>
    </div>
  );
};
