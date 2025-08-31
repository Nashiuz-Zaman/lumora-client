"use client";

import StepIndicator from "./StepIndicator";
import { CartItemList } from "./CartItemList";
import { ICartAction, TPopulatedCartItem } from "@/types/cart";
import { useCartState } from "@/hooks";
import { useCartActions } from "@/hooks/useCartActions";
import { InnerContainer } from "@/components/shared";
import { OrderSummary } from "./OrderSummary";
import EmptyPageLoader from "@/components/shared/EmptyPageLoader";
import { TUpdateQuantity } from "./CartItemCard";

export const CartPageMain = () => {
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

  if (!cart) return <EmptyPageLoader />;

  return (
    <InnerContainer className="my-14">
      <div className="2xl:max-w-[85%] mx-auto px-4 py-6">
        {/* Breadcrumb + Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-medium mb-2">Your Cart</h2>
              <p className="text-neutral-400">
                {cart?.totalItemQty
                  ? `${cart?.totalItemQty} items ready for checkout`
                  : null}
              </p>
            </div>
            <div className="hidden md:block">
              <StepIndicator />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_1.25fr] gap-8 !items-start">
          {/* Cart items */}
          <CartItemList
            items={cart?.items as TPopulatedCartItem[]}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />

          {/* Summary */}
          <OrderSummary
            subtotal={cart?.subtotal || 0}
            discount={cart?.discount || 0}
            tax={cart?.tax || 0}
            total={cart?.total || 0}
            shippingFee={cart?.shippingFee || 0}
            couponCode={cart?.couponCode || ""}
          />
        </div>
      </div>
    </InnerContainer>
  );
};
