// Coupon status object (frozen for runtime immutability)
export const CouponStatus = Object.freeze({
  Deleted: -1,
  Expired: 0,
  Active: 1,
} as const);

// Type derived from the frozen object
export type TCouponStatus = (typeof CouponStatus)[keyof typeof CouponStatus];

// Coupon sort options (frozen for immutability)
export const CouponSortOptions = Object.freeze([
  { label: "Code", value: "code" },
  { label: "Amount", value: "discountValue" },
  { label: "Created", value: "createdAt" },
] as const);
