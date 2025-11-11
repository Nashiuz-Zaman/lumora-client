"use client";

import { InputCheckbox } from "@/components/shared";
import { ICoupon } from "@/types";
import { formatDateTime } from "@/utils";

interface IExpiredCouponRowProps {
  couponData: ICoupon;
  isSelected: boolean;
  toggleSelectOne?: (item: ICoupon) => void;
  isLastEl?: boolean;
}

export const ExpiredCouponRow = ({
  couponData,
  isSelected,
  toggleSelectOne,
  isLastEl,
}: IExpiredCouponRowProps) => {
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!couponData) return null;

  return (
    <>
      {/* Selection checkbox */}
      <td className={cellClasses + " !pl-4 !pr-2 w-[1.6rem]"}>
        <InputCheckbox
          checked={isSelected}
          onChange={() => toggleSelectOne?.(couponData)}
        />
      </td>

      {/* Coupon Code */}
      <td className={cellClasses}>{couponData.code}</td>

      {/* Discount Type */}
      <td className={cellClasses}>{couponData.discountType}</td>

      {/* Discount Value */}
      <td className={cellClasses}>{couponData.discountValue}</td>

      {/* Expiry Date */}
      <td className={cellClasses}>{formatDateTime(couponData.expiryDate)}</td>

      {/* Expired At */}
      <td className={cellClasses}>{formatDateTime(couponData.updatedAt!)}</td>

      {/* Usage Limit */}
      <td className={cellClasses}>{couponData.usageLimit}</td>

      {/* Used Count */}
      <td className={cellClasses}>{couponData.usedCount}</td>
    </>
  );
};
