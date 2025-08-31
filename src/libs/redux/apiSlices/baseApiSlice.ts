import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER as string,
  }),

  endpoints: () => ({}),
  tagTypes: [
    "AdminProductsAll",
    "CategoryTree",
    "CustomerSettingsData",
    "CustomerProfileData",
    "GuestCartData",
    "UserCartData",
  ],
});
