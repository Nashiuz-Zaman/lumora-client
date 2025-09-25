import { CartActions } from "@/constants";
import { IProduct, IVariant } from "./product";

export interface ICartItem<P = string, V = string> {
  product: P;
  variant: V;
  quantity: number;
}

// unpopulated cart item:
export type TDatabaseCartItem = ICartItem<string, string>;

// Populated cart item:
export type TPopulatedCartItem = ICartItem<
  Partial<IProduct>,
  Partial<IVariant>
>;

export interface ICart<C> {
  _id?: string;
  user: string | "guest";
  items: C[];
  couponCode?: string;
  discount?: number;
  tax?: number;
  shippingFee?: number;
  createdAt?: string;
  updatedAt?: string;
  subtotal?: number;
  totalItemQty?: number;
  total?: number;
}

export interface ICartAction {
  product: string;
  variant: string;
  action: keyof typeof CartActions;
  quantity: number;
}

export type TDatabaseCart = ICart<TDatabaseCartItem>;
export type TPopulatedCart = ICart<TPopulatedCartItem>;
