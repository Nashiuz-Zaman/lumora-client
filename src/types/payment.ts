import { TPaymentType } from "@/constants";

export interface IRefundPaymentArgs {
  _id: string;
  reason: string;
}

export interface IPayment {
  _id?: string;
  order: string;
  orderId: string;
  name: string;
  email: string;
  type: TPaymentType;
  transactionId?: string;
  amount: number;
  details?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  cardType?: string;
  refundReason?: string;
}

export interface IRefundOptions {
  refundAmount: number;
  refundReason: string;
  bankTranId: string;
  refundTransId: string;
  refeId: string;
}
