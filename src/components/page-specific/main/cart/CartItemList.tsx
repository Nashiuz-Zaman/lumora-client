"use client";

import { ICartAction, TPopulatedCartItem } from "@/types/cart";
import { CartItemCard, TUpdateQuantity } from "./CartItemCard";
import { CartIcon, LinkBtn, LinkBtnTrans, NoData } from "@/components/shared/";
import { useCartActions, useCartState } from "@/hooks";

export const CartItemList = () => {
  const { cart } = useCartState();
  const { addRemoveProductToCart } = useCartActions();

  //  increase/decrease prodcut
  const updateQuantity: TUpdateQuantity = async (
    productId,
    variantId,
    change
  ) => {
    if (change === 0) return;

    const actionData = {
      productId,
      variantId,
      quantity: Math.abs(change),
      action: change > 0 ? "add" : "remove",
    };

    await addRemoveProductToCart({ data: actionData });
  };

  // completely removes the product
  const removeItem = async (item: TPopulatedCartItem) => {
    console.log(item.product._id!);
    const actionData: ICartAction = {
      productId: item.product._id!,
      variantId: item.variant._id!,
      quantity: item.quantity,
      action: "remove",
    };
    await addRemoveProductToCart({ data: actionData });
  };

  const cartItems = cart?.items || [];

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grow flex flex-col">
        {!cartItems.length && (
          <div className="grow flex items-center justify-center">
            <div>
              <NoData text="Cart is empty" className="!py-0 !my-0 !mb-4" />
              <LinkBtn className="!primaryClasses">
                <CartIcon className="text-xl" />
                Back to Shopping
              </LinkBtn>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="space-y-3">
            {cartItems?.map((item, i) => (
              <CartItemCard
                key={`${item.product._id}-${item.variant._id}-${i}`}
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
