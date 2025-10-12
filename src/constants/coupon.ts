import { ICoupon } from "@/types/coupon";
import { TSortOptions } from "@/types/generic";

// Coupon status object (frozen for runtime immutability)
export const CouponStatus = Object.freeze({
  Expired: 0,
  Active: 1,
} as const);

// Type derived from the frozen object
export type TCouponStatus = (typeof CouponStatus)[keyof typeof CouponStatus];

// Coupon sort options (frozen for immutability)
export const CouponSortOptions = Object.freeze([
  { label: "Created", value: "createdAt" },
  { label: "Code", value: "code" },
  { label: "Discount Type", value: "discountType" },
  { label: "Expiry", value: "expiryDate" },
  { label: "Used", value: "usedCount" },
  { label: "Amount", value: "discountValue" },
] as const satisfies TSortOptions<ICoupon>);
