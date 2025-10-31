import { TSortOptions } from "@/types/generic";
import { IPayment } from "@/types/payment";

export const PaymentType = Object.freeze({
  payment: "payment",
  refund: "refund",
} as const);

export type TPaymentType = (typeof PaymentType)[keyof typeof PaymentType];

// Payment sort options (frozen for immutability)
export const PaymentSortOptions = Object.freeze([
  { label: "Order ID", value: "orderId" },
  { label: "Amount", value: "amount" },
  { label: "Email", value: "email" },
  { label: "Type", value: "cardType" },
  { label: "Updated", value: "updatedAt" },
] as const satisfies TSortOptions<IPayment>);
