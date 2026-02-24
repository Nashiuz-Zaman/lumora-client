"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

// components
import { InputField, ButtonBtn, SelectField } from "@/components/shared";
import { Heading } from "./Heading";

// utils
import { showToast, catchAsyncGeneral } from "@/utils";

// redux
import { useUpdateCustomerAddressMutation } from "@/libs/redux/apiSlices/customer/customerApiSlice";

// types
import { ICustomerAddress } from "@/types";

interface IAddressFormProps {
  data?: ICustomerAddress;
  headingText?: string;
  className?: string;
  type: "billing" | "shipping";
  [key: string]: any;
}

export const AddressForm = ({
  data,
  headingText = "",
  className,
  type,
  ...props
}: IAddressFormProps) => {
  const [updateAddress, { isLoading }] = useUpdateCustomerAddressMutation();

  const { register, handleSubmit } = useForm<ICustomerAddress>({
    defaultValues: {
      address: data?.address || "",
      country: data?.country || "",
      state: data?.state || "",
      city: data?.city || "",
      zipCode: data?.zipCode || "",
    },
  });

  const onSubmit = catchAsyncGeneral(async (args) => {
    const data = args?.data as ICustomerAddress;

    const result = await updateAddress({
      type,
      addressData: data,
    }).unwrap();

    if (result?.success) {
      showToast({ message: "Address updated successfully!" });
    }
  });

  if (!data) return null;

  return (
    <div
      {...props}
      className={`max-w-xl shadow-md rounded-2xl border border-neutral-100 p-6 md:p-8 ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Icon
          icon={
            type === "billing"
              ? "mdi:home-city-outline"
              : "mdi:truck-delivery-outline"
          }
          className="text-xl text-primary"
        />
        <Heading text={headingText} />
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit({ data }))}
        className="space-y-5 animate-fadeIn"
      >
        <InputField
          labelText="Address"
          labelTextClassName="text-sm text-neutral-700 font-medium"
          inputClassName="rounded-md placeholder:text-neutral-500 text-sm transition-all duration-150"
          placeholder="Road No. 13/x, House no. 1320/C, Flat No. 5D"
          {...register("address")}
        />

        <SelectField
          labelText="Country"
          labelTextClassName="text-sm text-neutral-700 font-medium"
          selectClassName="text-sm focus:outline-none text-neutral-700 bg-transparent"
          className="rounded-md transition-all duration-150"
          options={[
            { text: "Select One", value: "Select One" },
            { text: "Bangladesh", value: "Bangladesh" },
            { text: "Canada", value: "Canada" },
            { text: "France", value: "France" },
            { text: "Germany", value: "Germany" },
            { text: "India", value: "India" },
            { text: "Italy", value: "Italy" },
            { text: "Mexico", value: "Mexico" },
            { text: "Netherlands", value: "Netherlands" },
            { text: "Pakistan", value: "Pakistan" },
            { text: "Srilanka", value: "Srilanka" },
            { text: "Spain", value: "Spain" },
            { text: "United Kingdom", value: "United Kingdom" },
            { text: "United States", value: "United States" },
          ]}
          {...register("country")}
        />

        <InputField
          labelText="Region/State"
          placeholder="e.g. New York"
          labelTextClassName="text-sm text-neutral-700 font-medium"
          inputClassName="rounded-md border border-neutral-200 placeholder:text-neutral-500 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
          {...register("state")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            labelText="City"
            placeholder="e.g. New York"
            labelTextClassName="text-sm text-neutral-700 font-medium"
            inputClassName="rounded-md border border-neutral-200 placeholder:text-neutral-500 text-sm transition-all duration-150"
            {...register("city")}
          />

          <InputField
            labelText="Zip Code"
            placeholder="10001"
            labelTextClassName="text-sm text-neutral-700 font-medium"
            inputClassName="rounded-md border border-neutral-200 placeholder:text-neutral-500 text-sm transition-all duration-150"
            {...register("zipCode")}
          />
        </div>

        <ButtonBtn
          type="submit"
          isLoading={isLoading}
          className="w-full md:w-auto !text-sm tracking-wide bg-primary text-neutral-50 hover:bg-primary/90 !rounded-full px-6 py-2.5 transition-all duration-200 uppercase"
        >
          Save Changes
        </ButtonBtn>
      </form>
    </div>
  );
};
