"use client";

import { useState } from "react";
import { ButtonBtn } from "@buttons/ButtonBtn";
import { ErrorMessage } from "@shared/ErrorMessage";
import { InputField } from "@shared/InputField";
import { catchAsyncGeneral } from "@/utils/catchAsyncGeneral";
import { useCartState } from "@/hooks/useCartState";

interface IPromoCodeProps {
  appliedCode: string | null;
}

export const PromoCode = ({ appliedCode }: IPromoCodeProps) => {
  const { cart, applyCoupon, removeCoupon, isCartBusy } = useCartState() || {};
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // RTK Mutations with isLoading state
  const handleApply = catchAsyncGeneral(
    async () => {
      setErrorMessage("");

      if (!cart?._id) {
        setErrorMessage("Please add a product first");
        return;
      }

      if (!couponCode.trim()) return;

      await applyCoupon({ data: { couponCode } });
      setCouponCode(""); // reset input
    },
    {
      handleError: "function",
      onError(_error, _args, message) {
        setErrorMessage(message ?? "Failed to apply coupon. Please try again");
      },
    },
  );

  const handleRemove = catchAsyncGeneral(
    async () => {
      setErrorMessage("");

      if (!cart?._id) {
        setErrorMessage("Please add a product first");
        return;
      }

      if (!appliedCode) return;

      await removeCoupon();
    },
    {
      handleError: "function",
      onError(_error, _args, message) {
        setErrorMessage(message ?? "Failed to remove coupon. Please try again");
      },
    },
  );

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
            <InputField
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCouponCode(e.target.value)
              }
              disabled={isCartBusy}
            />
            <ButtonBtn
              onClick={handleApply}
              className="secondaryClasses!"
              isLoading={isCartBusy}
            >
              Apply
            </ButtonBtn>
          </>
        ) : (
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-100 cursor-pointer text-red-600 rounded-lg text-sm font-medium transition-colors border border-red-100 hover:border-red-200"
            disabled={isCartBusy}
          >
            {isCartBusy ? "Removing..." : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};
