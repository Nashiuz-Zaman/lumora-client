"use client";

import { useState } from "react";
import { ButtonBtn, ErrorMessage, Inputfield } from "@/components/shared";
import { catchAsyncGeneral } from "@/utils";
import { useAuthState, useCartState } from "@/hooks";
import {
  useApplyCouponToUserCartMutation,
  useApplyCouponToGuestCartMutation,
  useRemoveCouponFromUserCartMutation,
  useRemoveCouponFromGuestCartMutation,
} from "@/libs/redux/apiSlices/cart/cartApiSlice";

interface IPromoCodeProps {
  appliedCode: string | null;
}

export const PromoCode = ({ appliedCode }: IPromoCodeProps) => {
  const { user } = useAuthState() || {};
  const { cart } = useCartState() || {};
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // RTK Mutations with isLoading state
  const [applyUserCoupon, { isLoading: applyingUser }] =
    useApplyCouponToUserCartMutation();
  const [applyGuestCoupon, { isLoading: applyingGuest }] =
    useApplyCouponToGuestCartMutation();
  const [removeUserCoupon, { isLoading: removingUser }] =
    useRemoveCouponFromUserCartMutation();
  const [removeGuestCoupon, { isLoading: removingGuest }] =
    useRemoveCouponFromGuestCartMutation();

  const handleApply = catchAsyncGeneral(
    async () => {
      setErrorMessage("");

      if (!cart?._id) {
        setErrorMessage(
          "Please add a product to your cart before applying a coupon."
        );
        return;
      }

      if (!couponCode.trim()) return;

      if (user) {
        await applyUserCoupon(couponCode).unwrap();
      } else {
        await applyGuestCoupon(couponCode).unwrap();
      }

      setCouponCode(""); // reset input
    },
    {
      handleError: "function",
      onError(_error, _args, message) {
        setErrorMessage(message ?? "Failed to apply coupon. Please try again");
      },
    }
  );

  const handleRemove = catchAsyncGeneral(
    async () => {
      setErrorMessage("");

      if (!cart?._id) {
        setErrorMessage(
          "There is no cart to remove a coupon from. Please add a product first."
        );
        return;
      }

      if (!appliedCode) return;

      if (user) {
        await removeUserCoupon(undefined).unwrap();
      } else {
        await removeGuestCoupon(undefined).unwrap();
      }
    },
    {
      handleError: "function",
      onError(_error, _args, message) {
        setErrorMessage(message ?? "Failed to apply coupon. Please try again");
      },
    }
  );

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
            className="px-4 py-2 bg-red-100 cursor-pointer text-red-600 rounded-lg text-sm font-medium transition-colors border border-red-100 hover:border-red-200"
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};
