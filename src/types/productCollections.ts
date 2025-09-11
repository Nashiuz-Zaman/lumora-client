import { IProduct } from "./product";

export interface IProductCollection {
  _id?: string;
  title: string;
  slug: string;
  productCount?: number;
  products: (string | IProduct)[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductCollectionsByPage {
  _id: string;
  productCollections: IProductCollection[];
}
