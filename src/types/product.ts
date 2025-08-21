import { TProductStatusValue } from "@/constants/product";

export interface IVariant {
  sku: string;
  stock: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  [key: string]: unknown;
}

export interface IProduct {
  title: string;
  subtitle: string;
  defaultPrice: number;
  defaultImage: string;
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
}

export interface IProductFormProps {
  mode?: "create" | "edit";
  product?: IProduct;
}
