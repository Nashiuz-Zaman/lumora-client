"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  ButtonBtnTrans,
  InputField,
  PlusIcon,
  TrashcanIcon,
} from "@/components/shared";
import { IProduct } from "@/types";
import { useWatch, useFormContext } from "react-hook-form";
import { toLabel } from "@/utils";

interface IVariantInformationBlockProps {
  variantIndex: number;
  variantKeys: string[];
  onAddKey: (key: string) => void;
  onRemoveKey: (key: string) => void;
  defaultVariantKeys: string[];
}

export const VariantInformationBlock = ({
  variantIndex,
  variantKeys,
  onAddKey,
  onRemoveKey,
  defaultVariantKeys,
}: IVariantInformationBlockProps) => {
  const [newKeyInput, setNewKeyInput] = useState("");
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<IProduct>();

  const price = useWatch({ control, name: `variants.${variantIndex}.price` });
  const oldPrice = useWatch({
    control,
    name: `variants.${variantIndex}.oldPrice`,
  });

  useEffect(() => {
    if (price && oldPrice && Number(oldPrice) > Number(price)) {
      const discount =
        ((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100;
      setValue(
        `variants.${variantIndex}.discountPercentage`,
        Math.round(discount)
      );
    } else {
      setValue(`variants.${variantIndex}.discountPercentage`, 0);
    }
  }, [price, oldPrice, setValue, variantIndex]);

  const handleAddNewProperty = () => {
    if (!newKeyInput.trim()) return;
    onAddKey(newKeyInput.trim());
    setNewKeyInput("");
  };

  return (
    <div className="rounded-md p-4 sm:p-5 bg-white border border-neutral-200">
      <h4 className="text-neutral-400 mb-4 text-base">
        Variant {variantIndex + 1}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3 sm:gap-4 mb-6">
        {variantKeys.map((key) => {
          const isNumberField = ["price", "oldPrice", "stock"].includes(key);
          const isDiscount = key === "discountPercentage";

          return (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 w-full"
            >
              <InputField
                inputClassName="rounded-md"
                labelText={toLabel(key)}
                labelTextClassName="font-medium text-sm sm:text-base"
                type={isNumberField ? "number" : "text"}
                readOnly={isDiscount}
                {...register(
                  `variants.${variantIndex}.${key}`,
                  // make this commented section active again once product data upload has been finished
                  {
                    required:
                      ["sku", "price", "stock"].includes(key) ||
                      !defaultVariantKeys.includes(key)
                        ? `${toLabel(key)} is required`
                        : false,
                    ...(isNumberField && {
                      valueAsNumber: true,
                      validate: (value) => {
                        if (isNaN(value as number)) return "Must be a number";
                        if ((value as number) < 0) return "Cannot be negative";
                        return true;
                      },
                    }),
                  }
                )}
                error={
                  errors.variants?.[variantIndex]?.[key]?.message as string
                }
                placeholder={toLabel(key)}
              />

              {!defaultVariantKeys.includes(key) && !isDiscount && (
                <ButtonBtnTrans
                  title="Remove Property"
                  className="mt-1 sm:mt-0"
                  onClick={() => onRemoveKey(key)}
                >
                  <TrashcanIcon className="text-red-500 sm:mb-4" />
                </ButtonBtnTrans>
              )}
            </div>
          );
        })}
      </div>

      {/* New key input */}
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <InputField
          placeholder="New property name"
          inputClassName="rounded-md"
          value={newKeyInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewKeyInput(e.target.value)
          }
          className="flex-1 w-full"
        />
        <ButtonBtnTrans
          type="button"
          onClick={handleAddNewProperty}
          title="Add new property"
          className="font-medium"
        >
          <PlusIcon className="text-xl" />
          New Property
        </ButtonBtnTrans>
      </div>
    </div>
  );
};
