import { TReturnReason, TReturnRequestStatus } from "@/constants";

export interface IReturnRequest {
  _id?: string;
  order: string;
  payment: string;
  orderId: string;
  reason: TReturnReason;
  description: string;
  invoice: string;
  files?: string[];
  createdAt?: string;
  updatedAt?: string;
  status: TReturnRequestStatus;
}
