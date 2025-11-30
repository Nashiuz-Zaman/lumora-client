import { IOrder } from "@/types";
import { TSortOptions } from "@/types/generic";

export const OrderStatus = Object.freeze({
  Pending: 0,
  Confirmed: 1,
  Shipped: 2,
  Delivered: 3,
  Cancelled: 4,
  Returned: 5,
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

export const statusDesignMap: Record<
  (typeof OrderStatus)[keyof typeof OrderStatus],
  { icon: string; text: string; color: string }
> = {
  [OrderStatus.Pending]: {
    icon: "solar:clock-circle-bold",
    text: "Your order is pending confirmation.",
    color: "text-yellow-500",
  },
  [OrderStatus.Confirmed]: {
    icon: "solar:check-circle-bold",
    text: "Your order has been confirmed.",
    color: "text-green-600",
  },
  [OrderStatus.Shipped]: {
    icon: "mdi:truck-delivery",
    text: "Your order has been shipped.",
    color: "text-green-600",
  },
  [OrderStatus.Delivered]: {
    icon: "mdi:package-delivered",
    text: "Your order has been delivered. Thank you for shopping with us!",
    color: "text-green-600",
  },
  [OrderStatus.Cancelled]: {
    icon: "ix:cancelled",
    text: "Your order was cancelled.",
    color: "text-red-500",
  },
  [OrderStatus.Returned]: {
    icon: "solar:refresh-circle-bold",
    text: "Your order was returned.",
    color: "text-yellow-600",
  },
};
