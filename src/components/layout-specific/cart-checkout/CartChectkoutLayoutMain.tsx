"use client";

import StepIndicator from "@layout-specific/cart-checkout/StepIndicator";
import { InnerContainer } from "@containers/InnerContainer";
import { LoadingSpinner } from "@shared/LoadingSpinner";
import { OrderSummary } from "@layout-specific/cart-checkout/OrderSummary";
import { usePathname } from "next/navigation";
import { useCartState } from "@/hooks/useCartState";
import { ButtonBtnTrans } from "@/components/shared/buttons/ButtonBtnTrans";
import { CartIcon } from "@/components/shared/icons/CartIcon";

const CartCheckoutLayoutMain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cart, isCartBusy } = useCartState();
  const pathname = usePathname();
  const { clearCartItems } = useCartState();

  let title = "Your Cart";
  if (pathname.startsWith("/checkout")) {
    title = "Checkout";
  } else if (pathname.startsWith("/payment-result")) {
    title = "Payment";
  }

  return (
    <InnerContainer className="my-14">
      <div className="2xl:max-w-[85%] mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center grow justify-between pr-20">
              <div className="flex items-center gap-6">
                {/* Cart Heading */}
                <div className="shrink-0">
                  <h2 className="text-3xl font-medium mb-2">{title}</h2>
                  {pathname.startsWith("/cart") && cart?.totalItemQty ? (
                    <p className="text-neutral-400">
                      {cart.totalItemQty} items ready for checkout
                    </p>
                  ) : null}
                </div>

                {/* Cart Activity Loading Spinner */}
                {isCartBusy && (
                  <LoadingSpinner className="py-0! my-0! static!" />
                )}
              </div>

              {cart.totalItemQty && cart.totalItemQty > 0 ? (
                <ButtonBtnTrans
                  onClick={clearCartItems}
                  className="text-secondary hover:text-secondary-dark transition-colors duration-150 hover:underline"
                >
                  <CartIcon className="text-2xl" /> Clear Cart
                </ButtonBtnTrans>
              ) : null}
            </div>

            <div className="hidden md:block">
              <StepIndicator />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[3fr_1.25fr] xl:gap-8 items-start!">
          {/* Dynamic left-side content */}
          {children}

          {/* Static Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </InnerContainer>
  );
};

export default CartCheckoutLayoutMain;
