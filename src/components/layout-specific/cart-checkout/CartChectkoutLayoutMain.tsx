"use client";

import StepIndicator from "@/components/layout-specific/cart-checkout/StepIndicator";
import { InnerContainer, LoadingSpinner } from "@/components/shared";
import { useCartState } from "@/hooks";
import { OrderSummary } from "@/components/layout-specific/cart-checkout/OrderSummary";
import { usePathname } from "next/navigation";

const CartCheckoutLayoutMain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cart, isCartLoading } = useCartState();
  const pathname = usePathname();

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
            <div className="flex items-center gap-6">
              <div className="shrink-0">
                <h2 className="text-3xl font-medium mb-2">{title}</h2>

                {pathname.startsWith("/cart") && cart?.totalItemQty ? (
                  <p className="text-neutral-400">
                    {cart.totalItemQty} items ready for checkout
                  </p>
                ) : null}
              </div>

              {isCartLoading && <LoadingSpinner className="!py-0 !my-0 !static" />}
            </div>
            <div className="hidden md:block">
              <StepIndicator />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[3fr_1.25fr] xl:gap-8 !items-start">
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
