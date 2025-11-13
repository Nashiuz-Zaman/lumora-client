"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useModal, useAuthState } from "@/hooks";
import { usePostReviewMutation } from "@/libs/redux/apiSlices/reviews/reviewsApiSlice";

// utils
import { showToast, catchAsyncGeneral } from "@/utils";

// shared
import {
  StarRatingInput,
  ButtonBtn,
  ButtonBtnTrans,
  TextArea,
  InputField,
  ErrorMessage,
} from "@/components/shared";

import { ReviewIcon } from "@/components/shared";
import { BaseModal } from "./BaseModal";
import { IReview } from "@/types/review";

const defaultRating: number = 4;

interface IAddReviewModalProps {
  productId: string;
  refetch: () => void;
}

export const AddReviewModal = ({
  productId,
  refetch,
}: IAddReviewModalProps) => {
  const { user } = useAuthState();
  const router = useRouter();
  const { openModal, closeModal, isModalOpen } = useModal();
  const [buttonContainer, setButtonContainer] = useState<HTMLElement | null>(
    null
  );

  const [postReview, { isLoading: isPosting }] = usePostReviewMutation();

  const {
    control,
    handleSubmit,
    reset,
    register,
    setError,
    formState: { errors },
  } = useForm<Partial<IReview>>({
    defaultValues: {
      rating: defaultRating,
      title: "",
      name: "",
      comment: "",
    },
  });

  useEffect(() => {
    const el = document.getElementById("review-button-portal");
    if (el) setButtonContainer(el);
  }, []);

  const onSubmit = catchAsyncGeneral(
    async (args) => {
      const data = args?.data as Partial<IReview>;

      const reviewData = {
        product: productId,
        rating: data.rating,
        title: data.title,
        name: data.name,
        comment: data.comment,
      };

      const res = await postReview(reviewData).unwrap();
      if (res.success) {
        showToast({ message: res.message });
        closeModal();
        reset();
        refetch();
      }
    },
    {
      handleError: "function",
      onError: (_, __, message) => {
        setError("root", { type: "manual", message });
      },
    }
  );

  const handleOpenModal = () => {
    if (!user?._id) {
      router.push("/auth/login");
      return;
    }
    openModal();
  };

  const writeReviewButton = (
    <ButtonBtn onClick={handleOpenModal} className="!successClasses !rounded-full mx-auto">
      <ReviewIcon className="text-xl" />
      Write a customer review
    </ButtonBtn>
  );

  return (
    <>
      {buttonContainer && createPortal(writeReviewButton, buttonContainer)}

      {isModalOpen && (
        <BaseModal
          condition={isModalOpen}
          closeFunction={closeModal}
          className="!w-full max-w-[20rem] xs:max-w-[30rem] sm:max-w-[35rem] bg-white rounded-md p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Add a Review</h2>
          {errors.root && <ErrorMessage text={errors.root.message!} />}

          <form
            onSubmit={handleSubmit((data) => onSubmit({ data }))}
            className="space-y-4"
          >
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRatingInput
                    value={field.value!}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Title */}
            <InputField
              labelText="Review Title"
              placeholder="Enter a headline for your review"
              {...register("title", { required: "Title is required" })}
            />

            {/* Name */}
            <InputField
              labelText="Your Name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />

            {/* Comment */}
            <TextArea
              labelText="Comment"
              placeholder="Write your review here..."
              {...register("comment", { required: "Comment is required" })}
            />

            <div className="flex justify-end gap-4 pt-2">
              <ButtonBtnTrans onClick={closeModal}>Cancel</ButtonBtnTrans>
              <ButtonBtn className="!successClasses" isLoading={isPosting}>
                Submit
              </ButtonBtn>
            </div>
          </form>
        </BaseModal>
      )}
    </>
  );
};
