"use client";

import { useFormContext } from "react-hook-form";
import { IProduct } from "@/types";

import {
  FormSectionHeading,
  InputCheckbox,
  Inputfield,
} from "@/components/shared";
import { ProductStatus } from "@/constants";

type TProductOptionsAndBrandVendorProps = {
  className?: string;
};

export const ProductOptionsAndBrandVendor = ({
  className = "",
}: TProductOptionsAndBrandVendorProps) => {
  const { register, watch, setValue } = useFormContext<IProduct>();

  return (
    <div className={className}>
      {/* Product Options */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-8 ">
        <FormSectionHeading tag="h4" text="Product Options" />

        <InputCheckbox
          labelText="Active"
          {...register("status", {
            onChange: (e) =>
              setValue(
                "status",
                e.target.checked ? ProductStatus.Active : ProductStatus.Draft
              ),
          })}
          checked={watch("status") === ProductStatus.Active}
        />
      </div>

      {/* Brand & Vendor */}
      <div className="bg-white rounded-xl p-5 border border-neutral-200 mb-8">
        <Inputfield
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
