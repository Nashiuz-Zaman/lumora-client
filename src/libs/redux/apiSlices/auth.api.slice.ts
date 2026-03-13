import { IApiResponse, IUserPopulated } from "@/types";
import { baseApiSlice } from "./base.api.slice";
import { IGoogleUser } from "@/hooks";
import { TAppDispatch } from "../store";

// ----------
// Types
// ----------
export interface ILocalLoginRequest {
  email: string;
  password: string;
}
type TApiUserResponse = IApiResponse<{
  user: Partial<IUserPopulated>;
}>;

// ----------
// Cache Seeder
// ----------
const seedCurrentUser = (
  dispatch: TAppDispatch,
  user: Partial<IUserPopulated>,
) => {
  dispatch(
    authApiSlice.util.upsertQueryData("getCurrentUser", undefined, {
      success: true,
      status: "success",
      data: { user },
    }),
  );
};

// ----------
// Shared login cache handler
// ----------
const handleLoginSuccess = async (
  _arg: unknown,
  {
    dispatch,
    queryFulfilled,
  }: {
    dispatch: TAppDispatch;
    queryFulfilled: Promise<{ data: IApiResponse }>;
  },
) => {
  try {
    const { data } = await queryFulfilled;

    const user = data?.data?.user;

    if (user) {
      seedCurrentUser(dispatch, user);
    }
  } catch (err) {
    console.log("Auth cache sync failed:", err);
  }
};

// ----------
// API Slice
// ----------
export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    localLogin: builder.mutation<TApiUserResponse, ILocalLoginRequest>({
      query: (data) => ({
        url: "/auth/login/local",
        method: "POST",
        data,
      }),

      onQueryStarted: handleLoginSuccess,
      invalidatesTags: ["Cart"],
    }),

    socialLogin: builder.mutation<TApiUserResponse, IGoogleUser>({
      query: (data) => ({
        url: "/auth/login/social",
        method: "POST",
        data,
      }),

      onQueryStarted: handleLoginSuccess,
      invalidatesTags: ["Cart"],
    }),

    getCurrentUser: builder.query<TApiUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation<IApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["User", "Cart"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // Clear all RTK Query cache
          dispatch(authApiSlice.util.resetApiState());
        } catch (err) {
          console.error("Logout request failed:", err);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

// ----------
// Hooks
// ----------
export const {
  useLocalLoginMutation,
  useSocialLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApiSlice;
