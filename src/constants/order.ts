import { IOrder } from "@/types";
import { TSortOptions } from "@/types/generic";

export const OrderStatus = Object.freeze({
  Pending: 0,
  Confirmed: 1,
  Shipped: 2,
  Delivered: 3,
  Cancelled: 4,
  Returned: 5,
  Deleted: 6,
} as const);

// Type derived from the frozen object
export type TOrderStatusValue = (typeof OrderStatus)[keyof typeof OrderStatus];

// Order sort options (frozen for immutability)
export const OrderSortOptions = Object.freeze([
  { label: "Customer", value: "name" },
  { label: "Email", value: "email" },
  { label: "Updated", value: "updatedAt" },
  { label: "Order Total", value: "total" },
] as const satisfies TSortOptions<IOrder>);

// Optional type for order sort values
export type TOrderSortOptionValue = (typeof OrderSortOptions)[number]["value"];
