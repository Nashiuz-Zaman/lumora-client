import { baseApiSlice } from "./base.api.slice";

export const emailApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resendConfirmationEmail: builder.mutation({
      query: ({ email }) => ({
        url: `/users/new-verification-email`,
        method: "PATCH",
        body: { email },
      }),
    }),
  }),
  overrideExisting: false,
});

// ----------
// Exports
// ----------
export const { useResendConfirmationEmailMutation } = emailApiSlice;
