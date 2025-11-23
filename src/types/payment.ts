import { TPaymentType } from "@/constants";
import { IOrder } from "./order";
import { IUser } from "./user";

// ---------------------------------------------------------
// PAYMENT MODEL
// Represents a payment record for an order
// ---------------------------------------------------------
export interface IPayment {
  _id?: string;
  order: NonNullable<IOrder["_id"]>;
  orderId: NonNullable<IOrder["orderId"]>;

  name: IUser["name"];
  email: IUser["email"];

  type: TPaymentType;
  transactionId?: string;

  amount: number;
  details?: Record<string, any>;
  cardType?: string;
  refundReason?: string;

  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------
// REFUND PAYMENT ARGUMENTS
// Used when initiating a refund request for a payment
// ---------------------------------------------------------
export interface IRefundPaymentArgs {
  _id: string;
  reason: NonNullable<IPayment["refundReason"]>;
}

// ---------------------------------------------------------
// REFUND OPTIONS
// Details required to process a refund
// ---------------------------------------------------------
export interface IRefundOptions {
  refundAmount: number;
  refundReason: IPayment["refundReason"];
  bankTranId: string;
  refundTransId: string;
  refeId: string;
}
