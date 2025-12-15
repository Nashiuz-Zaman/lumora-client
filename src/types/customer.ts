import { TQueryDataWithQueryMeta } from "./generic";
import { IUser } from "./user";

// ---------------------------------------------------------
// CUSTOMER ADDRESS
// Represents a customer's address (billing or shipping)
// ---------------------------------------------------------
export interface ICustomerAddress {
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// ---------------------------------------------------------
// BASE CUSTOMER USER INFO (shared shape)
// ---------------------------------------------------------
export interface ICustomerUserBase {
  name: IUser["name"];
  email: IUser["email"];
  phone?: IUser["phone"];
  image?: IUser["image"];
  createdAt: IUser["createdAt"];
  lastLoginAt?: IUser["lastLoginAt"];
}

// ---------------------------------------------------------
// CUSTOMER MODEL
// Links a user to their billing and shipping addresses
// ---------------------------------------------------------
export interface ICustomer {
  id?: string;
  userId: IUser["_id"];
  billingAddress: ICustomerAddress;
  shippingAddress: ICustomerAddress;
}

// ---------------------------------------------------------
// CUSTOMER PROFILE
// Full customer profile, including optional metadata
// ---------------------------------------------------------
export interface ICustomerProfile extends ICustomerUserBase {
  billingAddress: ICustomer["billingAddress"];
  shippingAddress: ICustomer["shippingAddress"];
}

// Module declaration to add customerDetails to IUserPopulated
declare module "./user" {
  interface IUserPopulated {
    customerDetails?: ICustomer;
  }
}

// ---------------------------------------------------------
// CUSTOMER LIST WITH PAGINATION
// Full customer list with pagination
// ---------------------------------------------------------
export interface IPaginatedCustomer extends ICustomerUserBase {
  _id: string;
  userId: IUser["_id"];
}

export type TPaginatedCustomers = TQueryDataWithQueryMeta<{
  customers: IPaginatedCustomer[];
}>;
