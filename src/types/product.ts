import { TProductStatusValue } from "@/constants/product";
import { IReview } from "./review";
import { IQueryMeta } from "./generic";
import { TImage } from "./shared";

// ---------------------------------------------------------
// VARIANT MODEL
// Represents a single product variant with price, stock, etc.
// ---------------------------------------------------------
export interface IVariant {
  _id?: string;
  sku: string;
  stock: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------
// VIDEO MODEL
// Represents a product-related video
// ---------------------------------------------------------
export interface IVideo {
  _id?: string;
  url: string;
}

// ---------------------------------------------------------
// PRODUCT MODEL
// Core product data including variants, media, and metadata
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// PRODUCT WITH MINIMAL REVIEW STATS
// Includes average rating and total review count
// ---------------------------------------------------------
export type TProductWithMinimalReviewStats = IProduct & {
  averageRating?: number;
  totalReviews?: number;
};

// ---------------------------------------------------------
// SEARCHBAR RESULT PRODUCT
// Minimal product info for search dropdowns
// ---------------------------------------------------------
export interface ISearchbarResultProduct {
  title: IProduct["title"];
  defaultImage: IProduct["defaultImage"];
  slug: IProduct["slug"];
}

// ---------------------------------------------------------
// PRODUCT WITH FULL REVIEWS STATS
// Contains product, reviews, and aggregated review statistics
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// PRODUCT FORM PROPS
// Props for create/edit product forms
// ---------------------------------------------------------
export interface IProductFormProps {
  mode?: "create" | "edit";
  product?: IProduct;
}

// ---------------------------------------------------------
// UPDATE PRODUCT ARGUMENTS
// Used when updating an existing product
// ---------------------------------------------------------
export interface IUpdateProductArgs {
  id: string;
  data: Partial<IProduct>;
}

// ---------------------------------------------------------
// GET PRODUCTS PARAMETERS
// Optional query parameters for product listing API
// ---------------------------------------------------------
export interface IGetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: unknown;
}
