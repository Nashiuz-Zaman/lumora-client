import { TProductStatusValue } from "@/constants/product";

export interface IVariant {
  _id?: string;
  sku: string;
  stock: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  [key: string]: unknown;
}

export interface IProduct {
  _id?: string;
  slug: string;
  title: string;
  subtitle: string;
  defaultPrice: number;
  defaultOldPrice: number;
  defaultImage: string;
  totalStock: number;
  brand: string;
  variants: IVariant[];
  videos: { url: string }[];
  images?: (string | File)[];
  warrantyAndSupport: string;
  aboutProduct: string;
  status: TProductStatusValue;
  specifications: { key: string; value: string }[];
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string;
  tags?: string;
  canonicalUrl?: string;
  topCategory?: string;
  subCategory?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductFormProps {
  mode?: "create" | "edit";
  product?: IProduct;
}
