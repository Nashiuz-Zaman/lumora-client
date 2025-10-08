import { TReviewStatus } from "@/constants";
import { IUser } from "./user";
import { IProduct } from "./product";
import { IQueryMeta } from "./generic";

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

export interface IReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingCounts: Record<number, number>;
  ratingPercentages: Record<number, number>;
}

export interface IProductReviewsWithStats {
  stats: IReviewStats;
  reviews: IReview[];
  queryMeta: IQueryMeta;
}

export interface IWriteReviewInput {
  name: string;
  title: string;
  product: string;
  rating: number;
  comment?: string;
}
