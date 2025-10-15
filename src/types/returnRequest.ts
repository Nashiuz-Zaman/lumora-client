import { TReturnReason, TReturnRequestStatus } from "@/constants";
import { IOrder } from "./order";
import { IPayment } from "./payment";

export interface IReturnRequest<O = string, P = string> {
  _id?: string;
  order: O;
  payment: P;
  name?: string;
  email?: string;
  phone?: string;
  orderId: string;
  total?: number;
  reason: TReturnReason;
  description: string;
  invoice: string;
  files?: string[];
  createdAt?: string;
  updatedAt?: string;
  status: TReturnRequestStatus;
}

export type TPopulatedReturnRequest = IReturnRequest<IOrder, IPayment>;
