"use client";

import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { BaseModal } from "./BaseModal";
import {
  ButtonBtn,
  ButtonBtnTrans,
  SelectField,
  ErrorMessage,
  InputField,
} from "../shared";
import { useModal } from "@/hooks";
import { catchAsyncGeneral, showToast } from "@/utils";
import { ICoupon } from "@/types";
import { useCreateCouponMutation } from "@/libs/redux/apiSlices/coupon/couponApiSlice";

interface ICreateCouponModalProps {
  target?: HTMLElement | null; // where the trigger button will render
}

export const CreateCouponModal = ({ target }: ICreateCouponModalProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm<Partial<ICoupon>>({
    defaultValues: { discountType: "percentage", expiryDate: "" },
  });

  const startDate = watch("startDate");
  const discountType = watch("discountType");
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const onSubmit = catchAsyncGeneral(
    async (args) => {
      const data = args?.data as Partial<ICoupon>;

      const res = await createCoupon(data).unwrap();

      if (res.success) {
        showToast({ message: res.message });
        reset();
        closeModal();
      }
    },
    {
      handleError: "function",
      onError: (_error, _args, message) => {
        setError("root", { message: message });
      },
    }
  );

  return (
    <>
      {/* Portal trigger button */}
      {target &&
        createPortal(
          <ButtonBtn
            className="!primaryClasses !rounded-full !py-2 !px-5"
            onClick={openModal}
          >
            + New Coupon
          </ButtonBtn>,
          target
        )}

      {/* Modal */}
      <BaseModal
        className="bg-white p-6 rounded-xl shadow-md !w-full max-w-[40rem]"
        condition={isModalOpen}
        closeFunction={closeModal}
        allowCloseOnOutsideClick={false}
      >
        <form
          className="space-y-4"
          onSubmit={handleSubmit((data) => onSubmit({ data }))}
        >
          <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>

          {/* Root error message */}
          {errors.root && <ErrorMessage text={errors.root.message} />}

          {/* Coupon Code */}
          <InputField
            labelText="Coupon Code"
            placeholder="E.g. WELCOME10"
            {...register("code", { required: "Coupon code is required" })}
            error={errors.code?.message}
          />

          {/* Description */}
          <InputField
            labelText="Description"
            placeholder="Optional description"
            {...register("description")}
          />

          {/* Discount Type & Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              labelText="Discount Type"
              placeholder="Select type"
              {...register("discountType", {
                required: "Select a discount type",
              })}
              options={[
                { text: "Percentage", value: "percentage" },
                { text: "Flat", value: "flat" },
              ]}
              error={errors.discountType?.message}
            />

            <InputField
              labelText="Discount Value"
              type="number"
              placeholder="e.g. 10"
              {...register("discountValue", {
                required: "Discount value is required",
                min: { value: 1, message: "Value must be at least 1" },
                valueAsNumber: true,
                validate: (value) =>
                  discountType === "percentage" && (value as number) > 100
                    ? "Invalid percentage"
                    : true,
              })}
              error={errors.discountValue?.message}
            />
          </div>

          {/* Minimum Order Amount & Usage Limit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              labelText="Minimum Order Amount"
              type="number"
              placeholder="Optional"
              {...register("minimumOrderAmount", { valueAsNumber: true })}
            />
            <InputField
              labelText="Usage Limit"
              type="number"
              placeholder="Optional"
              {...register("usageLimit", { valueAsNumber: true })}
            />
          </div>

          {/* Start Date & Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              labelText="Start Date"
              type="datetime-local"
              {...register("startDate", { required: "Start date is required" })}
              error={errors.startDate?.message}
            />
            <InputField
              labelText="Expiry Date"
              type="datetime-local"
              {...register("expiryDate", {
                required: "Expiry date is required",
                validate: (value) =>
                  !startDate || new Date(value as string) >= new Date(startDate)
                    ? true
                    : "Expiry date cannot be earlier than start date",
              })}
              error={errors.expiryDate?.message}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4 pt-6  items-center">
            <ButtonBtnTrans type="button" onClick={closeModal}>
              Cancel
            </ButtonBtnTrans>
            <ButtonBtn
              type="submit"
              isLoading={isLoading}
              className="!primaryClasses"
            >
              Create
            </ButtonBtn>
          </div>
        </form>
      </BaseModal>
    </>
  );
};
