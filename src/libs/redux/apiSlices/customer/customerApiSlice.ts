import {
  IApiResponse,
  ICustomerAddress,
  ICustomerProfile,
  TPaginatedCustomers,
} from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { TBasicInfoFormValues } from "@/components/page-specific/customer/settings/BasicInfoForm";
import { IAuthFormSignup } from "@/components/page-specific";

export const customerApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signupCustomer: builder.mutation<
      IApiResponse<{ email: string }>,
      IAuthFormSignup
    >({
      query: (data) => ({
        url: "/customers/",
        method: "POST",
        data,
      }),
    }),

    getCustomerProfileData: builder.query<
      IApiResponse<{ customerProfileData: ICustomerProfile }>,
      undefined
    >({
      query: () => ({
        url: `/customers/profile`,
        method: "GET",
      }),
      providesTags: ["CustomerProfileData"],
    }),

    updateCustomerBasicInfo: builder.mutation<
      IApiResponse,
      TBasicInfoFormValues
    >({
      query: (data) => ({
        url: "/customers/basic-info",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CustomerProfileData"],
    }),

    updateCustomerAddress: builder.mutation<
      IApiResponse,
      { type: "billing" | "shipping"; addressData: ICustomerAddress }
    >({
      query: ({ type, addressData }) => ({
        url:
          type === "billing"
            ? "/customers/billing-address"
            : "/customers/shipping-address",
        method: "PATCH",
        data: addressData,
      }),
      invalidatesTags: ["CustomerProfileData"],
    }),

    updateCustomerPasswordFromSettings: builder.mutation<
      IApiResponse,
      { currentPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/customers/settings/change-password",
        method: "PATCH",
        data,
      }),
    }),

    getCustomerList: builder.query<
      IApiResponse<TPaginatedCustomers>,
      Record<string, any> | void
    >({
      query: (params) => ({
        url: "/customers",
        method: "GET",
        params,
      }),
    }),
  }),
  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const {
  useGetCustomerProfileDataQuery,
  useUpdateCustomerBasicInfoMutation,
  useUpdateCustomerAddressMutation,
  useUpdateCustomerPasswordFromSettingsMutation,
  useSignupCustomerMutation,
  useGetCustomerListQuery,
} = customerApiSlice;
