export interface ICoupon {
  _id?: string;
  code: string;
  description?: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  startDate: string;
  expiryDate: string;
  usageLimit?: number;
  usedCount?: number;
  minimumOrderAmount?: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}
