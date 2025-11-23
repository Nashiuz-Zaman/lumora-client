import { TReturnReason, TReturnRequestStatus } from "@/constants";
import { IOrder } from "./order";
import { IPayment } from "./payment";

// ---------------------------------------------------------
// RETURN REQUEST MODEL
// ---------------------------------------------------------
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
  status: TReturnRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------
// POPULATED RETURN REQUEST
// ---------------------------------------------------------
export type TPopulatedReturnRequest = IReturnRequest<IOrder, IPayment>;
