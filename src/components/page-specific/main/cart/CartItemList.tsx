"use client";

import { CartItemCard } from "./CartItemCard";
import { CartIcon } from "@icons/CartIcon";
import { LinkBtn } from "@buttons/LinkBtn";
import { LinkBtnTrans } from "@buttons/LinkBtnTrans";
import { NoData } from "@shared/NoData";
import { useCartState } from "@/hooks/useCartState";

export const CartItemList = () => {
  const { cart, updateCartItemQuantity, removeCartItem, isCartBusy } =
    useCartState();

  const cartItems = cart?.items || [];

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grow flex flex-col">
        {!cartItems.length && (
          <div className="grow min-h-100 lg:min-h-auto p-5 rounded-xl flex items-center justify-center">
            <div className="mb-16">
              <NoData text="Cart is empty" className="py-0! my-0! mb-4!" />
              <LinkBtn href="/products/s" className="primaryClasses!">
                <CartIcon className="text-2xl" />
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
                updateQuantity={updateCartItemQuantity}
                removeItem={removeCartItem}
                isCartMutating={isCartBusy}
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
