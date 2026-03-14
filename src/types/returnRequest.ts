import { TReturnReason, TReturnRequestStatus } from "@/constants/returnRequest";
import { IOrder } from "./order";
import { IPayment } from "./payment";
import { IUserBasic } from "./shared";

// ---------------------------------------------------------
// RETURN REQUEST MODEL
// ---------------------------------------------------------
export interface IReturnRequest<O = string, P = string> extends IUserBasic {
  _id?: string;
  order: O;
  payment: P;
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
