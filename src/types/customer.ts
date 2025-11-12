import { IUser } from "./user";

export interface ICustomerAddress {
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface ICustomer {
  id?: string;
  userId: string;
  billingAddress?: ICustomerAddress;
  shippingAddress?: ICustomerAddress;
}

export interface ICustomerProfile {
  name: IUser["name"];
  email: IUser["email"];
  phone: IUser["phone"];
  image?: IUser["image"];
  lastLoginAt?: IUser["lastLoginAt"];
  createdAt?: IUser["createdAt"];
  billingAddress?: ICustomerAddress;
  shippingAddress?: ICustomerAddress;
}
