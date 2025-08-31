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
  name: string;
  email: string;
  phone?: string;
  deliveryAddress: string;
  subtotal: number;
  total: number;
  shippingFee?: number;
  discount?: number;
  tax?: number;
  items: TPopulatedCartItem[];
  couponCode?: string;
  status: TOrderStatusValue;
  activities: IOrderActivity[];
  shippingTrackingNumber?: string;
  shippingCarrier?: string;
  estimatedDelivery?: Date;
  cancellationReason?: string;
  invoice?: string;
  createdAt?: string;
  updatedAt?: string;
}
