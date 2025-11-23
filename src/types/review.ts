import { TReviewStatus } from "@/constants";
import { IUser } from "./user";
import { IProduct } from "./product";
import { IQueryMeta } from "./generic";

// ---------------------------------------------------------
// REVIEW MODEL
// ---------------------------------------------------------
export interface IReview {
  _id?: string;
  user: string | Partial<IUser>;
  name: string;
  product: string | Partial<IProduct>;
  title: string;
  rating: number;
  comment?: string;
  status: TReviewStatus;
  helpfulBy?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------
// REVIEW STATS
// ---------------------------------------------------------
export interface IReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingCounts: Record<number, number>;
  ratingPercentages: Record<number, number>;
}

// ---------------------------------------------------------
// PRODUCT REVIEWS WITH STATS
// ---------------------------------------------------------
export interface IProductReviewsWithStats {
  stats: IReviewStats;
  reviews: IReview[];
  queryMeta: IQueryMeta;
}

// ---------------------------------------------------------
// WRITE REVIEW INPUT
// ---------------------------------------------------------
export interface IWriteReviewInput {
  name: string;
  title: string;
  product: string;
  rating: number;
  comment?: string;
}
