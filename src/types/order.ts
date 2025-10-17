import { TOrderStatusValue } from "@/constants";
import { TPopulatedCartItem } from "./cart";

export interface IOrderActivity {
  time: Date;
  status: TOrderStatusValue;
}

export interface IOrder {
  _id?: string;
  orderId?: string;
  user?: string; // optional for guests
  cartId?: string;
  name: string;
  email: string;
  phone?: string;
  deliveryAddress: string;
  subtotal: number;
  total: number;
  shippingFee?: number;
  isArchived: boolean;
  discount?: number;
  tax?: number;
  items: TPopulatedCartItem[];
  couponCode?: string;
  status: TOrderStatusValue;
  activities: IOrderActivity[];
  shippingTrackingNumber?: string;
  shippingCarrier?: string;
  estimatedDelivery?: string;
  cancellationReason?: string;
  invoice?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type IMarkOrderShippedArgs = {
  shippingTrackingNumber: string;
  shippingCarrier: string;
  estimatedDelivery: string;
  _id: string;
};

export interface ICancelOrdersAdminArgs {
  _ids: string[];
  reason?: string;
}
