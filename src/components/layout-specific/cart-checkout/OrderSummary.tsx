"use client";

import { LinkBtn, LockIcon } from "@/components/shared";
import { PromoCode } from "./PromoCode";
import { formatPrice } from "@/utils";
import { useCartState } from "@/hooks";
import { usePathname } from "next/navigation";

export const OrderSummary = () => {
  const { cart } = useCartState();
  const pathname = usePathname();

  const subtotal = cart?.subtotal ?? 0;
  const shippingFee = cart?.shippingFee ?? 0;
  const tax = cart?.tax ?? 0;
  const discount = cart?.discount ?? 0;
  const total = cart?.total ?? 0;
  const couponCode = cart?.couponCode ?? "";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 sticky top-6 overflow-hidden">
      <div className="bg-linear-to-br from-primary to-purple-500 px-6 py-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p className="text-white text-sm">Review your purchase</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Shipping</span>
            <span className="font-medium text-secondary">
              {formatPrice(shippingFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Tax</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">Discount</span>
            <span className="font-medium text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
        </div>

        {/* Promo Code */}
        <PromoCode appliedCode={couponCode} />

        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">{formatPrice(total)}</span>
          </div>

          <p className="text-xs text-neutral-500 text-center">
            *Final price may vary based on your location
          </p>
        </div>

        {/* Show checkout button only if not already on /checkout */}
        {pathname === "/cart" && (
          <>
            <LinkBtn
              href="/checkout"
              className="!primaryClasses !rounded-full mx-auto mt-4"
            >
              Secure Checkout
            </LinkBtn>

            <div className="text-center space-y-3 text-xs">
              <div className="flex items-center justify-center gap-1">
                <LockIcon className="text-xl" />{" "}
                <span>SSL Secured Checkout</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
