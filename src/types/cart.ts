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
  _id?: string;
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
  user: string | null;
  items: C[];
  couponCode?: ICoupon["code"];
  createdAt?: string;
  updatedAt?: string;
  totalItemQty?: number;
}

// ---------------------------------------------------------
// POPULATED CART MODEL
// ---------------------------------------------------------
export type TPopulatedCart = ICart<TPopulatedCartItem>;
