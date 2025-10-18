"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ButtonBtn, IcfyIcon, Inputfield } from "@/components/shared";
import { SubmitHandler, useForm } from "react-hook-form";
import { IOrder } from "@/types";

interface ITrackingFormValues {
  orderId: IOrder["orderId"];
}

export const OrderTrackingForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITrackingFormValues>();

  const onSubmit: SubmitHandler<ITrackingFormValues> = async (data) => {
    router.push(`${pathname}?id=${data.orderId}`);
  };

  return (
    <div className="bg-white border shadow-sm rounded-lg h-max border-neutral-200 p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputfield
          labelText="Order ID"
          placeholder="Your Order ID"
          labelContainerClassName="mb-3 font-semibold"
          inputClassName="rounded-md"
          error={errors.orderId?.message || ""}
          {...register("orderId", {
            required: "Order ID is required",
            pattern: {
              value: /^ORD\d{4}\d+$/, // Must start with "ORD" and then digits
              message: 'Order ID must start with "ORD" followed by numbers',
            },
          })}
        />

        <ButtonBtn
          type="submit"
          className="mt-10 !rounded-full !w-full md:!w-[80%] !primaryClasses mx-auto"
        >
          <IcfyIcon icon="entypo:location" />
          Track Order
        </ButtonBtn>
      </form>
    </div>
  );
};
