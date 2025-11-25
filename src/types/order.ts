import { TOrderStatusValue } from "@/constants";
import { ICart, TPopulatedCartItem } from "./cart";
import { ICustomer } from "./customer";
import { IUser } from "./user";

export interface IOrderActivity {
  time: string;
  status: TOrderStatusValue;
  isArchived: boolean;
}

export interface IOrder {
  _id?: string;
  orderId?: string;

  user: NonNullable<IUser["_id"]>;
  cartId: NonNullable<ICart["_id"]>;

  name: IUser["name"];
  email: IUser["email"];
  phone: NonNullable<IUser["phone"]>;

  shippingAddress: NonNullable<ICustomer["shippingAddress"]>;
  billingAddress: NonNullable<ICustomer["billingAddress"]>;

  // ---- Totals -----------------------------------------
  subtotal: NonNullable<ICart["subtotal"]>;
  total: NonNullable<ICart["total"]>;
  shippingFee?: ICart["shippingFee"];
  discount?: ICart["discount"];
  tax?: ICart["tax"];

  // ---- Items & coupons --------------------------------
  items: TPopulatedCartItem[];
  couponCode?: ICart["couponCode"];

  // ---- Status & activity -------------------------------
  status: TOrderStatusValue;
  activities: IOrderActivity[];
  isArchived: boolean;

  // ---- Shipping info -----------------------------------
  shippingTrackingNumber?: string;
  shippingCarrier?: string;
  estimatedDelivery?: string;

  // ---- Cancel / Invoice --------------------------------
  cancellationReason?: string;
  invoice?: string;

  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------
// MARK ORDER SHIPPED
// ---------------------------------------------------------
export type IMarkOrderShippedArgs = {
  shippingTrackingNumber: NonNullable<IOrder["shippingTrackingNumber"]>;
  shippingCarrier: NonNullable<IOrder["shippingCarrier"]>;
  estimatedDelivery: NonNullable<IOrder["estimatedDelivery"]>;
  _id: NonNullable<IOrder["_id"]>;
};

// ---------------------------------------------------------
// CANCEL ORDERS (ADMIN)
// ---------------------------------------------------------
export interface ICancelOrdersAdminArgs {
  _ids: NonNullable<IOrder["_id"]>[];
  reason?: IOrder["cancellationReason"];
}

// ---------------------------------------------------------
// CANCEL ORDERS (Customer)
// ---------------------------------------------------------
export interface ICancelOrdersCustomerArgs {
  _ids: NonNullable<IOrder["_id"]>[];
}

// ---------------------------------------------------------
// TRACK ORDER RESPONSE
// ---------------------------------------------------------
export type TTrackOrderData = IOrder & { billingAddress: string };

// ---------------------------------------------------------
// ORDER CHECKOUT FORM'S CUSTOMER INFO
// Values used in order checkout
// ---------------------------------------------------------
export interface ICustomerInfoFormValues {
  name: IOrder["name"];
  email: IOrder["email"];
  phone: IOrder["phone"];
  shippingAddress: IOrder["shippingAddress"];
}
