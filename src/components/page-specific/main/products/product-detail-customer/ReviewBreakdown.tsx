"use client";

import { NoData, RatingStars, StarFullIcon } from "@/components/shared";

interface IReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingCounts: Record<number, number>;
  ratingPercentages: Record<number, number>;
}

interface IReviewBreakdownProps {
  stats: IReviewStats;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export const ReviewBreakdown = ({
  stats,
  isError = false,
  className = "",
}: IReviewBreakdownProps) => {
  const { averageRating, totalReviews, ratingCounts, ratingPercentages } =
    stats;

  return (
    <div
      className={`w-full relative bg-white ${className} space-y-6 min-h-[10rem]`}
    >
      <h3 className="text-2xl font-semibold">Customer Reviews</h3>

      {isError ||
        (!stats && <NoData centered={true} text="Something went wrong" />)}

      {/* Average stars and score */}
      <div className="flex items-center gap-3">
        <RatingStars
          rating={averageRating}
          className="text-2xl gap-0! text-yellow-400!"
        />
        <span className="font-semibold text-lg">{averageRating} / 5</span>
        <span className="text-neutral-400 text-sm">
          ({totalReviews} ratings)
        </span>
      </div>

      {/* Star breakdown */}
      <div className="space-y-4!">
        {[5, 4, 3, 2, 1].map((star) => {
          const percentage = ratingPercentages[star];
          const count = ratingCounts[star] || 0;

          return (
            <div
              key={star}
              className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3 mb-2"
            >
              {/* Star label */}
              <span className="text-sm font-medium flex items-center justify-between">
                {star}
                <StarFullIcon className="text-lg mr-4" />
              </span>

              {/* Bar */}
              <div className="h-4 rounded-full bg-neutral-200 overflow-hidden relative">
                <div
                  className="!h-full bg-orange-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Percentage + count */}
              <span className="text-sm text-right text-neutral-600">
                {percentage}% ({count})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
