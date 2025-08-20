"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Inputfield } from "@/components/shared";
import RichTextEditor from "@/components/shared/RichTextEditor/RichTextEditor";
import { IProduct } from "@/types";

export const ProductBasicInfo = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IProduct>();

  return (
    <div className="bg-white p-5 border border-neutral-200 rounded-xl">
      {/* Title & Subtitle */}
      <div className="mb-12">
        <Inputfield
          labelText="Product Title"
          labelTextClassName="font-semibold text-xl"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message as string}
          className="mb-4"
          inputClassName="!rounded-md"
        />

        <Inputfield
          labelText="Subtitle"
          labelTextClassName="font-semibold text-xl"
          {...register("subtitle")}
          inputClassName="!rounded-md"
        />
      </div>

      {/* About Product */}
      <Controller
        name="aboutProduct"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <RichTextEditor
            labelText="About Product"
            labelTextClassName="font-semibold text-xl"
            inputClassName="!p-6"
            className="mb-4"
            toolbarClassName="!bg-white !text-xl"
            defaultContent={field.value}
            setNewContent={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* Warranty & Support */}
      <Controller
        name="warrantyAndSupport"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <RichTextEditor
            labelText="Warranty & Support"
            labelTextClassName="font-semibold text-xl"
            inputClassName="!p-6"
            className="mb-4"
            toolbarClassName="!bg-white !text-xl"
            defaultContent={field.value}
            setNewContent={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
};
