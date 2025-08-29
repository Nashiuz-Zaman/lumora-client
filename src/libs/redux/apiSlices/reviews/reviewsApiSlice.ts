import { IApiResponse } from "@/types";
import { baseApiSlice } from "../baseApiSlice";
import { IProductReviewsWithStats } from "@/types/review";

export const reviewApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (params) => ({
        url: `/reviews`,
        method: "GET",
        params,
      }),
    }),

    getProductReviewsAndStats: builder.query<
      IApiResponse<IProductReviewsWithStats>,
      { productId: string; page?: number; limit?: number }
    >({
      query: ({ productId, ...params }) => ({
        url: `/reviews/${productId}`,
        method: "GET",
        params,
      }),
    }),

    // Post a new review for a product
    postReview: builder.mutation({
      query: (data) => ({
        url: `/reviews`,
        method: "POST",
        data,
      }),
    }),

    // Mark a review as helpful
    markReviewHelpful: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}/helpful`,
        method: "PATCH",
      }),
    }),

    // ✅ Bulk Approve Reviews
    bulkApproveReviews: builder.mutation({
      query: (ids) => ({
        url: `/reviews/bulk-approve`,
        method: "PATCH",
        data: { ids },
      }),
    }),

    // ❌ Bulk Delete Reviews
    bulkDeleteReviews: builder.mutation({
      query: (ids) => ({
        url: `/reviews/bulk-delete`,
        method: "PATCH",
        data: { ids },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductReviewsAndStatsQuery,
  usePostReviewMutation,
  useMarkReviewHelpfulMutation,
  useGetAllReviewsQuery,
  useBulkApproveReviewsMutation,
  useBulkDeleteReviewsMutation,
} = reviewApiSlice;
