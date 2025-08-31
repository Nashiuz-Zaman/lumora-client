export const OrderStatus = Object.freeze({
  Deleted: -3,
  Returned: -2,
  Cancelled: -1,
  Pending: 0,
  Confirmed: 1,
  Shipped: 2,
  Delivered: 3,
} as const);

// Type derived from the frozen object
export type TOrderStatusValue = (typeof OrderStatus)[keyof typeof OrderStatus];

// Order sort options (frozen for immutability)
export const OrderSortOptions = Object.freeze([
  { label: "Customer", value: "name" },
  { label: "Email", value: "email" },
  { label: "Updated", value: "updatedAt" },
  { label: "Order Total", value: "orderTotal" },
] as const);

// Optional type for order sort values
export type TOrderSortOptionValue = (typeof OrderSortOptions)[number]["value"];
