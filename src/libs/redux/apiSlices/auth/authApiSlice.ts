import { IApiResponse, IUserPopulated } from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { IGoogleUser } from "@/hooks";

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
const seedCurrentUser = (dispatch: any, user: Partial<IUserPopulated>) => {
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
  _arg: any,
  {
    dispatch,
    queryFulfilled,
  }: { dispatch: any; queryFulfilled: Promise<{ data: IApiResponse }> },
) => {
  try {
    const { data } = await queryFulfilled;

    const user = data?.data?.user;

    if (user) {
      seedCurrentUser(dispatch, user);
    }
  } catch (err) {
    console.error("Auth cache sync failed:", err);
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
      invalidatesTags: ["UserCartData"],
      onQueryStarted: handleLoginSuccess,
    }),

    socialLogin: builder.mutation<TApiUserResponse, IGoogleUser>({
      query: (data) => ({
        url: "/auth/login/social",
        method: "POST",
        data,
      }),
      invalidatesTags: ["UserCartData"],
      onQueryStarted: handleLoginSuccess,
    }),

    getCurrentUser: builder.query<TApiUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation<IApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["GuestCartData"],
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
