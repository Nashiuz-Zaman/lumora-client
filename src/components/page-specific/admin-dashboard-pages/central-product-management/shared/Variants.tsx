"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { IProduct, IVariant } from "@/types";
import { useState } from "react";
import { VariantInformationBlock } from "./VariantInformationBlock";
import { ButtonBtn, PlusIcon, TrashcanIcon } from "@/components/shared";

const defaultVariantKeys: string[] = [
  "sku",
  "stock",
  "price",
  "oldPrice",
  "discountPercentage",
];

const ignoredKeys: string[] = ["_id", "id"];

export const Variants = ({
  defaultVariant,
  existingVariant,
}: {
  defaultVariant: IVariant;
  existingVariant?: IVariant;
}) => {
  const { control } = useFormContext<IProduct>();

  const [variantKeys, setVariantKeys] = useState<string[]>(
    existingVariant
      ? Object.keys(existingVariant).filter((key) => !ignoredKeys.includes(key))
      : [...defaultVariantKeys]
  );

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleAddKey = (newKey: string) => {
    if (variantKeys.includes(newKey)) return; // avoid duplicates
    setVariantKeys((prev) => [...prev, newKey]);

    // Add the new key to all existing variants
    fields.forEach((variant, i) => {
      const updated = { ...variant, [newKey]: "" };
      update(i, updated);
    });
  };

  const handleRemoveKey = (key: string) => {
    setVariantKeys((prev) => prev.filter((k) => k !== key));

    // Remove the key from all variants
    fields.forEach((variant, i) => {
      const updated = { ...variant };
      delete updated[key];
      update(i, updated);
    });
  };

  const handleAddVariant = () => {
    const defaultVariantKeys = Object.keys(
      defaultVariant
    ) as (keyof IVariant)[];
    const newVariant = variantKeys.reduce((acc, key) => {
      if (defaultVariantKeys.includes(key)) {
        acc[key] = defaultVariant[key];
      } else {
        acc[key] = "";
      }
      return acc;
    }, {} as IVariant);

    append(newVariant);
  };

  const handleRemoveVariant = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-xl">Variants</h3>

        <ButtonBtn
          onClick={handleAddVariant}
          type="button"
          className="!primaryClasses !px-3 !py-1"
        >
          <PlusIcon className="text-lg" />
          New Variant
        </ButtonBtn>
      </div>

      <div className="space-y-5">
        {fields.map((variant, index) => (
          <div key={variant.id}>
            <VariantInformationBlock
              variantIndex={index}
              variantKeys={variantKeys}
              onAddKey={handleAddKey}
              onRemoveKey={handleRemoveKey}
              defaultVariantKeys={defaultVariantKeys}
            />

            {/* Show Remove Variant button for all except the first variant */}
            {index > 0 && (
              <ButtonBtn
                type="button"
                onClick={() => handleRemoveVariant(index)}
                className="!dangerClasses !px-4 !py-1 mt-3"
              >
                <TrashcanIcon className="text-sm" />
                Remove Variant
              </ButtonBtn>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
