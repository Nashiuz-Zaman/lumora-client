import { TPaymentStatus } from "@/constants";

export interface IPayment {
  _id?: string;
  order: string;
  orderId: string;
  name: string;
  email: string;
  status: TPaymentStatus;
  transactionId: string;
  amount: number;
  currency: "BDT";
  gateway: "sslcommerz";
  createdAt?: string;
  updatedAt?: string;
  cardType?: string;
  refundReason?: string;
}

export interface IRefundPaymentArgs {
  _id: string;
  reason: string;
}
