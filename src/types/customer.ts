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
export interface ICustomerProfile {
  name: IUser["name"];
  email: IUser["email"];
  phone: IUser["phone"];
  billingAddress: ICustomer["billingAddress"];
  shippingAddress: ICustomer["billingAddress"];
  image: IUser["image"];
  lastLoginAt: IUser["lastLoginAt"];
  createdAt: IUser["createdAt"];
}

declare module "./user" {
  interface IUserPopulated {
    customerDetails?: ICustomer;
  }
}
