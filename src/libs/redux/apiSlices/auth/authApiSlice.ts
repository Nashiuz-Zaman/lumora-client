import { IApiResponse } from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { IGoogleUser } from "@/hooks";

// Define types for request & response
export interface ILocalLoginRequest {
  email: string;
  password: string;
}

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    localLogin: builder.mutation<IApiResponse, ILocalLoginRequest>({
      query: (data) => ({
        url: `/auth/login/local`,
        method: "POST",
        data,
      }),
    }),

    socialLogin: builder.mutation<IApiResponse, IGoogleUser>({
      query: (data) => ({
        url: "/auth/login/social",
        method: "POST",
        data,
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    logout: builder.mutation<IApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const {
  useLocalLoginMutation,
  useSocialLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApiSlice;
