import { TProductStatusValue } from "@/constants/product";
import { IReview } from "./review";
import { IQueryMeta } from "./api";

export interface IVariant {
  _id?: string;
  sku: string;
  stock: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  [key: string]: unknown;
}

export interface IVideo {
  _id?: string;
  url: string;
}

export type TImage = string | File;

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
  videos: IVideo[];
  images?: TImage[];
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
  createdAt?: string;
  updatedAt?: string;
  totalVariants?: number;
}

export type TProductWithMinimalReviewStats = IProduct & {
  averageRating?: number;
  totalReviews?: number;
};

export interface ISearchbarResultProduct {
  title: IProduct["title"];
  defaultImage: IProduct["defaultImage"];
  slug: IProduct["slug"];
}

export interface IProductWithFullReviewsStats {
  product: IProduct;
  reviews: IReview[];
  reviewStats?: {
    averageRating: number;
    totalReviews: number;
    ratingCounts: Record<number, number>;
    ratingPercentages: Record<number, number>;
  };
  reviewMeta: IQueryMeta;
}

export interface IProductFormProps {
  mode?: "create" | "edit";
  product?: IProduct;
}

export interface IUpdateProductArgs {
  id: string;
  data: Partial<IProduct>;
}

export interface IGetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: unknown;
}
