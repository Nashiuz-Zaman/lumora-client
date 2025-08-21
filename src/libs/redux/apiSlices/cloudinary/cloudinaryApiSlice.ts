import { baseApiSlice } from "../baseApiSlice";

export const cloudinaryApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSignedUrl: builder.query<string, { folder?: string } | void>({
      query: (params) => ({
        url: `/cloudinary/signed-url`,
        method: "GET",
        params,
      }),
      transformResponse: (res: { data: string }) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetSignedUrlQuery } = cloudinaryApiSlice;
