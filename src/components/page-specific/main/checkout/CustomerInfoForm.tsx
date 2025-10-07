"use client";

import { useForm, UseFormSetError } from "react-hook-form";
import {
  IcfyIcon,
  Inputfield,
  ButtonBtn,
  ErrorMessage,
} from "@/components/shared";

export interface ICustomerInfoFormValues {
  name: string;
  email: string;
  phone: string;
  city: string;
  zipCode: string;
  deliveryAddress: string;
}

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
        <Inputfield
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

        <Inputfield
          {...register("email", { required: "Email is required" })}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="email"
          labelText="Customer Email"
          placeholder="Your Email"
          error={errors.email?.message}
        />

        <Inputfield
          {...register("phone", { required: "Phone is required" })}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="phone"
          labelText="Customer Phone No."
          placeholder="Your Phone"
          error={errors.phone?.message}
        />

        <Inputfield
          {...register("city")}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="city"
          labelText="City"
          placeholder="Your City"
          error={errors.city?.message}
        />

        <Inputfield
          {...register("zipCode")}
          labelContainerClassName="mb-2"
          labelTextClassName="font-semibold"
          inputClassName="!rounded-md"
          name="zipCode"
          labelText="Postal Code"
          placeholder="Your Postal Code"
          error={errors.zipCode?.message}
        />

        <Inputfield
          {...register("deliveryAddress", {
            required: "Delivery address is required",
          })}
          className="sm:col-span-2"
          labelContainerClassName="mb-2"
          inputClassName="!rounded-md"
          labelTextClassName="font-semibold"
          name="deliveryAddress"
          labelText="Delivery Address"
          placeholder="Your Delivery Address"
          error={errors.deliveryAddress?.message}
        />
      </div>

      <ButtonBtn
        isLoading={isSubmitting}
        type="submit"
        className="!successClasses ml-auto gap-2 !rounded-full"
      >
        <IcfyIcon className="text-3xl" icon="cib:samsung-pay" />
        Pay for order
      </ButtonBtn>
    </form>
  );
};
