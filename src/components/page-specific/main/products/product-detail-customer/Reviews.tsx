"use client";

import { useState } from "react";
import { AddReviewModal } from "@/components/modals";

import { ReviewItem } from "./ReviewItem";
import { ReviewBreakdown } from "./ReviewBreakdown";

import {
  Pagination,
  LoadingSpinner,
  NoData,
  ErrorMessage,
} from "@/components/shared";

import { useGetProductReviewsAndStatsQuery } from "@/libs/redux/apiSlices/reviews/reviewsApiSlice";
import { IReview, IReviewStats } from "@/types/review";
import { IProductWithReviewsStats, IQueryMeta } from "@/types";

export const Reviews = ({
  initialData,
}: {
  initialData: IProductWithReviewsStats;
}) => {
  const [page, setPage] = useState<number>(1);

  // this is the initial data for SEO optimization
  const {
    product,
    reviews: initialReviews,
    reviewMeta: initialQueryMeta,
    reviewStats: initialStats,
  } = initialData;

  // Fetch additional pages only if page > 1
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError,
    refetch,
  } = useGetProductReviewsAndStatsQuery(
    { productId: product._id as string, page, limit: 3 },
    { skip: page === 1 }
  );

  // Use initial reviews for page 1
  const reviews: IReview[] =
    page === 1
      ? initialReviews
      : reviewsData?.success
      ? (reviewsData?.data?.reviews as IReview[])
      : [];

  const queryMeta: IQueryMeta | undefined =
    page === 1
      ? initialQueryMeta
      : reviewsData?.success
      ? reviewsData?.data?.queryMeta
      : undefined;

  const stats: IReviewStats | undefined =
    page === 1 ? initialStats : reviewsData?.data?.stats;

  if (!reviews || !queryMeta || !stats) return null;

  return (
    <div className="grid grid-cols-1 2md:grid-cols-[1fr_2fr] gap-8 md:gap-12 lg:gap-20">
      {/* Modal Portal */}
      <AddReviewModal productId={product._id!} refetch={refetch} />

      {/* Left Sidebar */}
      <div className="flex flex-col items-center">
        <ReviewBreakdown
          stats={stats!}
          className="pb-6 border-b border-neutral-200 mb-10"
        />

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Review this product</h3>
          <p className="mb-4">Share your thoughts with other customers</p>
          <div id="review-button-portal" />
        </div>
      </div>

      {/* Right Section: Reviews */}
      <div className="flex flex-col relative min-h-[10rem]">
        <h3 className="font-semibold text-primary text-2xl sm:text-3xl mb-5 text-center xl:text-left">
          What customers say
        </h3>

        {isReviewsLoading && <LoadingSpinner />}

        {isError && (
          <ErrorMessage
            centered
            text="Error loading reviews. Check back later."
          />
        )}

        {!isReviewsLoading && reviews.length === 0 && (
          <NoData text="Be the first to post a review." centered />
        )}

        {!isReviewsLoading && reviews.length > 0 && (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id}>
                <ReviewItem review={review} />
              </li>
            ))}
          </ul>
        )}

        {queryMeta && queryMeta.totalPages > 0 && (
          <div className="mt-auto pt-7">
            <Pagination
              totalPages={queryMeta.totalPages}
              currentPage={queryMeta.page}
              setCurrentPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
