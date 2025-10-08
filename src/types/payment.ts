import { TPaymentStatus } from "@/constants";

export interface IPayment {
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
}
