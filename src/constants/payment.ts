import { TSortOptions } from "@/types/generic";
import { IPayment } from "@/types/payment";

// Payment status object (frozen for runtime immutability)
export const PaymentStatus = Object.freeze({
  Paid: 1,
  "Partially Refunded": 0,
  Refunded: -1,
} as const);

export type TPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// Payment sort options (frozen for immutability)
export const PaymentSortOptions = Object.freeze([
  { label: "Order ID", value: "orderId" },
  { label: "Amount", value: "amount" },
  { label: "Email", value: "email" },
  { label: "Type", value: "cardType" },
  { label: "Updated", value: "updatedAt" },
] as const satisfies TSortOptions<IPayment>);
