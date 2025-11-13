"use client";

import { Controller, useFormContext } from "react-hook-form";
import { IProduct } from "@/types";

import {
  FormSectionHeading,
  InputCheckbox,
  InputField,
} from "@/components/shared";
import { ProductStatus } from "@/constants";
import { ChangeEvent } from "react";

type TProductOptionsAndBrandVendorProps = {
  className?: string;
};

export const ProductOptionsAndBrandVendor = ({
  className = "",
}: TProductOptionsAndBrandVendorProps) => {
  const { register, watch, control } = useFormContext<IProduct>();

  console.log(watch("status"));

  return (
    <div className={className}>
      {/* Product Options */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-6">
        <FormSectionHeading tag="h4" text="Product Options" />

        <Controller
          name="status"
          control={control}
          defaultValue={ProductStatus.Draft}
          render={({ field }) => (
            <InputCheckbox
              checkboxClassName="!accent-primary"
              labelText="Active"
              checked={field.value === ProductStatus.Active}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(
                  e.target.checked ? ProductStatus.Active : ProductStatus.Draft
                )
              }
            />
          )}
        />
      </div>

      {/* Brand & Vendor */}
      <div className="bg-white rounded-xl p-5 border border-neutral-200">
        <InputField
          {...register("brand")}
          labelText="Brand"
          labelTextClassName="font-medium"
          inputClassName="!rounded-md"
          placeholder="Brand"
        />
      </div>
    </div>
  );
};
