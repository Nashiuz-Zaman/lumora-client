// image type
export type TImage = string | File;

// money totals
export type TCartTotalsShape = {
  subtotal: number;
  total: number;
  tax: number;
  discount: number;
  shippingFee: number;
};

export interface IUserBasic {
  name: string;
  email: string;
  phone?: string;
}
