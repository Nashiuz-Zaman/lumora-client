"use client";

import { useState } from "react";
import { ButtonBtn, ErrorMessage, Inputfield } from "@/components/shared";
import { formatPrice } from "@/utils";
import { useAuthState, useCartState } from "@/hooks";
import {
  useApplyCouponToUserCartMutation,
  useApplyCouponToGuestCartMutation,
  useRemoveCouponFromUserCartMutation,
  useRemoveCouponFromGuestCartMutation,
} from "@/libs/redux/apiSlices/cart/cartApiSlice";

interface IPromoCodeProps {
  discount: number;
  appliedCode: string | null;
}

export const PromoCode = ({ discount, appliedCode }: IPromoCodeProps) => {
  const { user, isCustomer } = useAuthState() || {};
  const { cart } = useCartState() || {};
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // RTK Mutations with isLoading state
  const [applyUserCoupon, { isLoading: applyingUser }] =
    useApplyCouponToUserCartMutation();
  const [applyGuestCoupon, { isLoading: applyingGuest }] =
    useApplyCouponToGuestCartMutation();
  const [removeUserCoupon, { isLoading: removingUser }] =
    useRemoveCouponFromUserCartMutation();
  const [removeGuestCoupon, { isLoading: removingGuest }] =
    useRemoveCouponFromGuestCartMutation();

  const handleApply = async () => {
    setErrorMessage(null);

    if (!cart?._id) {
      setErrorMessage(
        "Please add a product to your cart before applying a coupon."
      );
      return;
    }

    if (!couponCode.trim()) return;

    try {
      if (user && isCustomer) {
        await applyUserCoupon(couponCode).unwrap();
      } else {
        await applyGuestCoupon(couponCode).unwrap();
      }

      setCouponCode(""); // reset input
    } catch (err) {
      console.error("Failed to apply coupon:", err);
      setErrorMessage("Failed to apply coupon. Please try again.");
    }
  };

  const handleRemove = async () => {
    setErrorMessage(null);

    if (!cart?._id) {
      setErrorMessage(
        "There is no cart to remove a coupon from. Please add a product first."
      );
      return;
    }

    if (!appliedCode) return;

    try {
      if (user && isCustomer) {
        await removeUserCoupon(undefined).unwrap();
      } else {
        await removeGuestCoupon(undefined).unwrap();
      }
    } catch (err) {
      console.error("Failed to remove coupon:", err);
      setErrorMessage("Failed to remove coupon. Please try again.");
    }
  };

  const isApplying = applyingUser || applyingGuest;
  const isRemoving = removingUser || removingGuest;

  return (
    <div className="bg-neutral-50 rounded-xl p-4">
      <div className="flex justify-between mb-3">
        <span className="text-sm font-medium text-neutral-700">Promo Code</span>
        {appliedCode && (
          <span className="text-xs text-green-600 font-medium">
            {appliedCode.toUpperCase()} Applied
          </span>
        )}
      </div>

      {errorMessage && <ErrorMessage text={errorMessage} />}

      <div className="flex space-x-2">
        {!appliedCode ? (
          <>
            <Inputfield
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCouponCode(e.target.value)
              }
              disabled={isApplying}
            />
            <ButtonBtn
              onClick={handleApply}
              className="!secondaryClasses"
              isLoading={isApplying}
            >
              Apply
            </ButtonBtn>
          </>
        ) : (
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        )}
      </div>

      {appliedCode && discount > 0 && (
        <div className="flex justify-between items-center mt-3 text-sm">
          <span className="text-neutral-600">
            Discount ({appliedCode.toUpperCase()})
          </span>
          <span className="font-medium text-green-600">
            -{formatPrice(discount)}
          </span>
        </div>
      )}
    </div>
  );
};
