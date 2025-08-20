// Order status object (frozen for runtime immutability)
export const OrderStatus = Object.freeze({
  Abandoned: -99,
  Deleted: -3,
  Returned: -2,
  Cancelled: -1,
  "Quotation Not Sent": 0,
  "Quotation Sent": 1,
  Confirmed: 2,
  Shipped: 3,
  Delivered: 4,
} as const);

// Type derived from the frozen object
export type TOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

// Order sort options (frozen for immutability)
export const OrderSortOptions = Object.freeze([
  { label: "Customer", value: "name" },
  { label: "Email", value: "email" },
  { label: "Updated", value: "updatedAt" },
  { label: "Order Total", value: "orderTotal" },
] as const);

// Optional type for order sort values
export type TOrderSortOptionValue = (typeof OrderSortOptions)[number]["value"];
