// ---------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------
import { IProduct } from "./product";

// ---------------------------------------------------------
// PRODUCT IN COLLECTION
// Represents a product reference inside a collection
// ---------------------------------------------------------
export interface IProductInCollection<P = string> {
  product: P;
  serial: number;
}

// Populated version: product object instead of just ID
export type TPopulatedProductInCollection = IProductInCollection<IProduct>;

// Populated version with review statistics
export type TPopulatedProductInCollectionWithReviewStats =
  TPopulatedProductInCollection & {
    reviewStats: {
      averageRating: number;
      totalReviews: number;
    };
  };

// ---------------------------------------------------------
// PRODUCT COLLECTION
// Represents a collection of products
// ---------------------------------------------------------
export interface IProductCollection<T = IProductInCollection> {
  _id: string;
  title: string;
  slug: string;
  page?: string;
  products: T[];
  createdAt: string;
  updatedAt: string;
}

// Populated collection with full product objects
export type TPopulatedProductCollection =
  IProductCollection<TPopulatedProductInCollection>;

// ---------------------------------------------------------
// PRODUCT COLLECTIONS BY PAGE
// Groups collections by page, including product counts
// ---------------------------------------------------------
export interface IProductCollectionsByPage {
  _id: string;
  productCollections: {
    _id: IProductCollection["_id"];
    slug: IProductCollection["slug"];
    title: IProductCollection["title"];
    productCount: number;
  }[];
}
