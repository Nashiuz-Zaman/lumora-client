"use client";

import { ICartAction, TPopulatedCartItem } from "@/types/cart";
import { CartItemCard, TUpdateQuantity } from "./CartItemCard";
import { CartIcon, LinkBtn, LinkBtnTrans, NoData } from "@/components/shared/";
import { useCartActions, useCartState } from "@/hooks";
import { CartActions } from "@/constants";

export const CartItemList = () => {
  const { cart } = useCartState();
  const { addRemoveProductToCart } = useCartActions();

  //  increase/decrease prodcut
  const updateQuantity: TUpdateQuantity = async (product, variant, change) => {
    if (+change === 0 || !product || !variant) return;

    const actionData: ICartAction = {
      product,
      variant,
      quantity: Math.abs(change),
      action: change > 0 ? CartActions.add : CartActions.remove,
    };

    await addRemoveProductToCart({ data: actionData });
  };

  // completely removes the product
  const removeItem = async (item: TPopulatedCartItem) => {
    if (!item.product || !item.quantity || !item.variant) return;

    const actionData: ICartAction = {
      product: item.product._id!,
      variant: item.variant._id!,
      quantity: item.quantity,
      action: CartActions.remove,
    };
    await addRemoveProductToCart({ data: actionData });
  };

  const cartItems = cart?.items || [];

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grow flex flex-col">
        {!cartItems.length && (
          <div className="grow p-5 rounded-xl flex items-center justify-center">
            <div className="mb-16" >
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
