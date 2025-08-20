// Return request status (frozen)
export const ReturnRequestStatus = Object.freeze({
  Rejected: -1,
  Pending: 0,
  Approved: 1,
} as const);

// Type for status values
export type TReturnRequestStatus =
  (typeof ReturnRequestStatus)[keyof typeof ReturnRequestStatus];

// Return request sort options (frozen)
export const ReturnRequestSortOptions = Object.freeze([
  { label: "Customer", value: "name" },
  { label: "Email", value: "email" },
  { label: "Order ID", value: "orderId" },
  { label: "Order Total", value: "orderTotal" },
  { label: "Status", value: "status" },
] as const);

// Type for sort option values
export type TReturnRequestSortOptionValue =
  (typeof ReturnRequestSortOptions)[number]["value"];

// Return reasons (frozen)
export const ReturnReasons = Object.freeze([
  "Wrong item delivered",
  "Missing items or accessories",
  "Item damaged/defective",
  "Product not as described",
  "Other",
] as const);

// Type for return reasons
export type TReturnReason = (typeof ReturnReasons)[number];
