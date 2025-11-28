"use client";

import { useForm, UseFormSetError } from "react-hook-form";
import {
  IcfyIcon,
  InputField,
  ButtonBtn,
  ErrorMessage,
} from "@/components/shared";
import { ICustomerInfoFormValues } from "@/types";

export interface ICustomerInfoFormProps {
  defaultValues?: Partial<ICustomerInfoFormValues>;
  isSubmitting?: boolean;
  onSubmit: (args: {
    data: ICustomerInfoFormValues;
    setError: UseFormSetError<ICustomerInfoFormValues>;
  }) => void;
}

export const CustomerInfoForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
}: ICustomerInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ICustomerInfoFormValues>({
    defaultValues,
  });

  const handleFormSubmit = (data: ICustomerInfoFormValues) => {
    onSubmit({ data, setError });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-[55rem] bg-neutral-50 p-7 rounded-xl"
    >
      {/* Root-level error */}
      {errors.root?.message && (
        <ErrorMessage className="mb-3" text={errors.root?.message} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-10">
        {/* Customer name */}
        <InputField
          {...register("name", { required: "Name is required" })}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          className="sm:col-span-2"
          inputClassName="!rounded-md"
          name="name"
          labelText="Customer Name"
          placeholder="Your Name"
          error={errors.name?.message}
        />
        {/* Email */}
        <InputField
          {...register("email", { required: "Email is required" })}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="email"
          labelText="Customer Email"
          placeholder="Your Email"
          error={errors.email?.message}
        />
        {/* Phone */}
        <InputField
          {...register("phone", { required: "Phone is required" })}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="phone"
          labelText="Customer Phone No."
          placeholder="Your Phone"
          error={errors.phone?.message}
        />
        {/* Delivery Address City */}
        <InputField
          {...register("shippingAddress.city")}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="shippingAddress.city"
          labelText="City"
          placeholder="Your City"
          error={errors.shippingAddress?.city?.message}
        />
        {/* Delivery Address State */}
        <InputField
          {...register("shippingAddress.state")}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          labelText="State"
          placeholder="Your State"
          error={errors.shippingAddress?.state?.message}
        />
        {/* Delivery Address Zip */}
        <InputField
          {...register("shippingAddress.zipCode")}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="shippingAddress.zipCode"
          labelText="Postal Code"
          placeholder="Your Postal Code"
          error={errors.shippingAddress?.zipCode?.message}
        />

        {/* Delivery Address Country */}
        <InputField
          {...register("shippingAddress.country")}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          labelText="Country"
          placeholder="Your Country"
          error={errors.shippingAddress?.country?.message}
        />

        {/* Full Address Text */}
        <InputField
          {...register("shippingAddress.address", {
            required: "Delivery address is required",
          })}
          className="sm:col-span-2"
          labelContainerClassName="mb-2"
          inputClassName="!rounded-md"
          labelTextClassName="font-semibold"
          name="shippingAddress.address"
          labelText="Shipping Address"
          placeholder="Your Shipping Address"
          error={errors.shippingAddress?.address?.message}
        />
      </div>

      <ButtonBtn
        isLoading={isSubmitting}
        type="submit"
        className="successClasses! ml-auto gap-2 rounded-full!"
      >
        <IcfyIcon className="text-3xl" icon="cib:samsung-pay" />
        Pay for order
      </ButtonBtn>
    </form>
  );
};
