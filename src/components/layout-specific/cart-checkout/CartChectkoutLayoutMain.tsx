"use client";

import StepIndicator from "@/components/layout-specific/cart-checkout/StepIndicator";
import { InnerContainer } from "@/components/shared";
import { useCartState } from "@/hooks";
import EmptyPageLoader from "@/components/shared/EmptyPageLoader";
import { OrderSummary } from "@/components/layout-specific/cart-checkout/OrderSummary";
import { usePathname } from "next/navigation";

const CartCheckoutLayoutMain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cart, isCartLoading } = useCartState();
  const pathname = usePathname();

  if (isCartLoading) return <EmptyPageLoader />;

  let title = "Your Cart";
  if (pathname.startsWith("/checkout")) {
    title = "Checkout";
  } else if (pathname.startsWith("/order-complete")) {
    title = "Payment Result";
  }

  return (
    <InnerContainer className="my-14">
      <div className="2xl:max-w-[85%] mx-auto px-4 py-6">
        {/* Breadcrumb + Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-medium mb-2">{title}</h2>
              {pathname.startsWith("/cart") && cart?.totalItemQty ? (
                <p className="text-neutral-400">
                  {cart.totalItemQty} items ready for checkout
                </p>
              ) : null}
            </div>
            <div className="hidden md:block">
              <StepIndicator />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_1.25fr] gap-8 !items-start">
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
