"use client";

import { BaseModal } from "./BaseModal";
import { Inputfield, ButtonBtn, ButtonBtnTrans } from "../shared";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";

export interface IShippingFormValues {
  shippingTrackingNumber: string;
  shippingCarrier: string;
  estimatedDelivery: string; // datetime-local string
}

interface IShippingModalProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (args: {
    data: IShippingFormValues;
    reset: UseFormReset<IShippingFormValues>;
  }) => void;
}

export const ShippingModal = ({
  isLoading,
  isOpen,
  onClose,
  onSubmit,
}: IShippingModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IShippingFormValues>();

  const submitHandler: SubmitHandler<IShippingFormValues> = (data) => {
    onSubmit({ data, reset });
  };

  return (
    <BaseModal
      className="bg-white p-6 rounded-xl shadow-md !w-full max-w-[35rem]"
      condition={isOpen}
      closeFunction={onClose}
      allowCloseOnOutsideClick={false}
    >
      <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <Inputfield
          labelText="Tracking Number"
          placeholder="Enter tracking number"
          {...register("shippingTrackingNumber", {
            required: "Tracking Number is required",
          })}
          error={errors.shippingTrackingNumber?.message}
        />

        <Inputfield
          labelText="Carrier"
          placeholder="Enter carrier name"
          {...register("shippingCarrier", { required: "Carrier is required" })}
          error={errors.shippingCarrier?.message}
        />

        <Inputfield
          labelText="Estimated Delivery Date"
          type="datetime-local"
          {...register("estimatedDelivery", {
            required: "Estimated Delivery Date is required",
          })}
          error={errors.estimatedDelivery?.message}
        />

        <div className="flex justify-end items-center gap-5 pt-4">
          <ButtonBtnTrans
            type="button"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancel
          </ButtonBtnTrans>

          <ButtonBtn
            type="submit"
            isLoading={isLoading}
            className="!primaryClasses"
          >
            Save
          </ButtonBtn>
        </div>
      </form>
    </BaseModal>
  );
};
