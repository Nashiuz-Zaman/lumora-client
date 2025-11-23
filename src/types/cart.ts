import { CartActions } from "@/constants";
import { IProduct, IVariant } from "./product";
import { ICoupon } from "./coupon";
import { TCartTotalsShape } from "./shared";

// ---------------------------------------------------------
// CART ITEM (Generic)
// ---------------------------------------------------------
export interface ICartItem<P = string, V = string> {
  product: P;
  variant: V;
  quantity: number;
}

// ---------------------------------------------------------
// UNPOPULATED CART ITEM (DB Stored)
// ---------------------------------------------------------
export type TDatabaseCartItem = ICartItem<string, string>;

// ---------------------------------------------------------
// POPULATED CART ITEM (Returned to client)
// ---------------------------------------------------------
export type TPopulatedCartItem = ICartItem<
  Partial<IProduct>,
  Partial<IVariant>
>;

// ---------------------------------------------------------
// CART TOTALS (Shared total fields)
// subtotal, total, tax, discount, shippingFee, etc.
// ---------------------------------------------------------
export type TCartTotals = Partial<TCartTotalsShape>;

// ---------------------------------------------------------
// MAIN CART MODEL
// ---------------------------------------------------------
export interface ICart<C = TDatabaseCartItem> extends TCartTotals {
  _id?: string;
  user: string | "guest";
  items: C[];
  couponCode?: ICoupon["code"];
  createdAt?: string;
  updatedAt?: string;
  totalItemQty?: number;
}

// ---------------------------------------------------------
// CART ACTION PAYLOAD
// ---------------------------------------------------------
export interface ICartAction {
  product: string;
  variant: string;
  action: keyof typeof CartActions;
  quantity: number;
}

// ---------------------------------------------------------
// POPULATED CART MODEL
// ---------------------------------------------------------
export type TPopulatedCart = ICart<TPopulatedCartItem>;
