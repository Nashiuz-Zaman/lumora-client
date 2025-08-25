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
