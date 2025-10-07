import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { getBaseApiUrl } from "@/utils";

const serverUrl = getBaseApiUrl();

export const baseApiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: serverUrl as string,
  }),

  endpoints: () => ({}),
  tagTypes: [
    "ProductsAdmin",
    "CategoryTree",
    "CustomerSettingsData",
    "CustomerProfileData",
    "GuestCartData",
    "UserCartData",
    "ProductCollectionsAdmin",
  ],
});
