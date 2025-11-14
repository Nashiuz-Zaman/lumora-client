import { IApiResponse, ICustomerAddress, ICustomerProfile } from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { TBasicInfoFormValues } from "@/components/page-specific/customer/settings/BasicInfoForm";

export const customerApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signupCustomer: builder.mutation({
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

    blockCustomer: builder.mutation({
      query: (userId) => ({
        url: `/customers/block/${userId}`,
        method: "PATCH",
      }),
    }),

    unblockCustomer: builder.mutation({
      query: (userId) => ({
        url: `/customers/unblock/${userId}`,
        method: "PATCH",
      }),
    }),

    deleteCustomer: builder.mutation({
      query: (userId) => ({
        url: `/customers/${userId}`,
        method: "DELETE",
      }),
    }),

    getCustomerList: builder.query({
      query: (params) => ({
        url: `/customers`,
        method: "GET",
        params: {
          ...params,
          limitFields: "userId,name,email,phone,status,createdAt,id",
        },
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
  useBlockCustomerMutation,
  useUnblockCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
