"use client";

import { createPortal } from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { BaseModal } from "./BaseModal";
import {
  ButtonBtn,
  ButtonBtnTrans,
  SelectField,
  ErrorMessage,
  Inputfield,
} from "../shared";
import { useModal } from "@/hooks";

interface ICreateCouponModalProps {
  target?: HTMLElement | null; // where the trigger button will render
}

interface IFormInputs {
  code: string;
  description?: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minimumOrderAmount?: number;
  usageLimit?: number;
  startDate: string;
  expiryDate: string;
  status: number | string;
}

export const CreateCouponModal = ({ target }: ICreateCouponModalProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      // TODO: API call to create coupon
      console.log("Form Data:", data);

      closeModal();
      reset();
    } catch (err) {
      console.error(err);
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>

          {/* Root error message */}
          {Object.keys(errors).length > 0 && (
            <ErrorMessage text="Please fix the errors below before submitting." />
          )}

          {/* Coupon Code */}
          <Inputfield
            labelText="Coupon Code"
            placeholder="E.g. WELCOME10"
            {...register("code", { required: "Coupon code is required" })}
            error={errors.code?.message}
          />

          {/* Description */}
          <Inputfield
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

            <Inputfield
              labelText="Discount Value"
              type="number"
              placeholder="e.g. 10"
              {...register("discountValue", {
                required: "Discount value is required",
                valueAsNumber: true,
              })}
              error={errors.discountValue?.message}
            />
          </div>

          {/* Minimum Order Amount & Usage Limit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inputfield
              labelText="Minimum Order Amount"
              type="number"
              placeholder="Optional"
              {...register("minimumOrderAmount", { valueAsNumber: true })}
            />
            <Inputfield
              labelText="Usage Limit"
              type="number"
              placeholder="Optional"
              {...register("usageLimit", { valueAsNumber: true })}
            />
          </div>

          {/* Start Date & Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inputfield
              labelText="Start Date"
              type="datetime-local"
              {...register("startDate", { required: "Start date is required" })}
              error={errors.startDate?.message}
            />
            <Inputfield
              labelText="Expiry Date"
              type="datetime-local"
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
              error={errors.expiryDate?.message}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <ButtonBtnTrans type="button" onClick={closeModal}>
              Cancel
            </ButtonBtnTrans>
            <ButtonBtn
              type="submit"
              isLoading={isSubmitting}
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
