// product
import { IProduct } from "./product";

// A product reference inside a collection
export interface IProductInCollection<P = string> {
  product: P;
  serial: number; 
}

export type TPopulatedProductInCollection = IProductInCollection<IProduct>;

export type TPopulatedProductInCollectionWithReviewStats =
  TPopulatedProductInCollection & {
    reviewStats: {
      averageRating: number;
      totalReviews: number;
    };
  };

// collection
export interface IProductCollection<T = IProductInCollection> {
  _id: string;
  title: string;
  slug: string;
  page?: string;
  products: T[];
  createdAt: string;
  updatedAt: string;
}

export type TPopulatedProductCollection =
  IProductCollection<TPopulatedProductInCollection>;

export interface IProductCollectionsByPage {
  _id: string;
  productCollections: {
    _id: IProductCollection["_id"];
    slug: IProductCollection["slug"];
    title: IProductCollection["title"];
    productCount: number;
  }[];
}
