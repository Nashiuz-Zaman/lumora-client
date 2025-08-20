// Payment status object (frozen for runtime immutability)
export const PaymentStatus = Object.freeze({
  Deleted: -3,
  "Partially Refunded": -2,
  Refunded: -1,
  Cancelled: 0,
  Failed: 1,
  Paid: 2,
} as const);

// Type derived from the frozen object
export type TPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// Payment sort options (frozen for immutability)
export const PaymentSortOptions = Object.freeze([
  { label: "Order ID", value: "orderId" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
] as const);

// Optional type for payment sort values
export type TPaymentSortOptionValue =
  (typeof PaymentSortOptions)[number]["value"];
