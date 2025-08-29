"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ButtonBtn,
  RatingStars,
  ThumbIconFilledIcon,
} from "@/components/shared";

import { useAuthState } from "@/hooks";
import { useMarkReviewHelpfulMutation } from "@/libs/redux/apiSlices/reviews/reviewsApiSlice";

import {
  showToast,
  catchAsyncGeneral,
  generateAvatar,
  formatDateTime,
} from "@/utils";
import { useRouter } from "next/navigation";
import { IReview } from "@/types/review";
import { IUser } from "@/types";

interface IReviewItemProps {
  review: IReview;
}

export const ReviewItem = ({ review }: IReviewItemProps) => {
  const router = useRouter();
  const { user, isCustomer } = useAuthState();
  const [helpfulBy, setHelpfulBy] = useState<string[]>(review.helpfulBy ?? []);
  const [markHelpful] = useMarkReviewHelpfulMutation();
  const alreadyMarked = user?._id ? helpfulBy.includes(user._id) : false;

  const handleHelpfulClick = catchAsyncGeneral(async () => {
    if (!user?._id) {
      router.push("/auth/login");
      return;
    }

    if (!isCustomer || alreadyMarked) return;

    setHelpfulBy((prev) => [...prev, user._id as string]);

    const res = await markHelpful(review._id).unwrap();
    if (res.success) showToast({ message: res.message });
  });

  return (
    <div className="p-4 sm:p-6 bg-neutral-50 rounded-md shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
        <Image
          src={(review.user as IUser).image || generateAvatar(review.name)}
          width={200}
          height={200}
          alt="user profile image"
          className="rounded-full aspect-square w-12 sm:w-14 flex-shrink-0"
        />
        <p className="font-semibold text-base sm:text-lg">
          {review.name || "Guest"}
        </p>

        <p className="mt-1 sm:mt-0 sm:ml-auto text-neutral-500 text-sm sm:text-base">
          {helpfulBy.length} {helpfulBy.length === 1 ? "person" : "people"}{" "}
          found this helpful
        </p>
      </div>

      <RatingStars rating={review.rating} className="!gap-1 mb-4" />

      {review.title && (
        <h3 className="font-semibold text-base sm:text-lg mb-2">
          {review.title}
        </h3>
      )}

      <p className="mb-4 text-sm sm:text-base">{review.comment}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <small className="text-neutral-500 text-xs sm:text-sm">
          {formatDateTime(review.createdAt!, false)}
        </small>

        <ButtonBtn
          onClick={handleHelpfulClick}
          className={`!py-2 !px-4 whitespace-nowrap ${
            alreadyMarked ? "successClasses" : "hover:successClasses"
          }`}
          title={alreadyMarked ? "You found this helpful" : "Mark as helpful"}
          isDisabled={!isCustomer || alreadyMarked}
        >
          <ThumbIconFilledIcon /> Helpful
        </ButtonBtn>
      </div>
    </div>
  );
};


