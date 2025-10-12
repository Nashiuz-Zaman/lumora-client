import { baseApiSlice } from "../baseApiSlice";

export interface ICustomerListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: unknown;
}

export const customerApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/customers/",
        method: "POST",
        data,
      }),
    }),

    getCustomerProfileData: builder.query({
      query: (id) => ({
        url: `/users/me/customer-profile/${id}`,
        method: "GET",
      }),
      providesTags: ["CustomerProfileData"],
    }),

    getCustomerSettingsData: builder.query({
      query: () => ({
        url: "/customers/settings-data",
        method: "GET",
      }),
      providesTags: ["CustomerSettingsData"],
    }),

    updateCustomerBasicInfo: builder.mutation({
      query: (data) => ({
        url: "/customers/settings-data/basic-info",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CustomerSettingsData"],
    }),

    updateBillingAddress: builder.mutation({
      query: (data) => ({
        url: "/customers/settings-data/billing-address",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CustomerSettingsData"],
    }),

    updateShippingAddress: builder.mutation({
      query: (data) => ({
        url: "/customers/settings-data/shipping-address",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CustomerSettingsData"],
    }),

    updateCustomerPasswordFromSettings: builder.mutation({
      query: (data) => ({
        url: "/customers/settings-data/change-password",
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
  useGetCustomerSettingsDataQuery,
  useUpdateBillingAddressMutation,
  useUpdateShippingAddressMutation,
  useUpdateCustomerPasswordFromSettingsMutation,
  useSignupUserMutation,
  useGetCustomerListQuery,
  useBlockCustomerMutation,
  useUnblockCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
