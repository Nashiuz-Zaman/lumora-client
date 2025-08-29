"use client";

import { useState, useMemo, useEffect } from "react";

export interface IVariant {
  _id?: string;
  sku: string;
  stock: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  [key: string]: unknown;
}

const fixedKeys = [
  "_id",
  "id",
  "sku",
  "stock",
  "price",
  "oldPrice",
  "discountPercentage",
];

export const VariantSelector = ({
  variants,
  onVariantSelect,
}: {
  variants: IVariant[];
  onVariantSelect?: (variant: IVariant | undefined) => void;
}) => {
  // figure out which keys are option keys like color, storage etc.
  const optionKeys = useMemo(() => {
    if (!variants.length) return [];
    return Object.keys(variants[0]).filter((key) => !fixedKeys.includes(key));
  }, [variants]);

  // collect unique values for each option
  const optionValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    optionKeys.forEach((key) => {
      const set = new Set<string>();
      variants.forEach((variant) => {
        if (variant[key]) set.add(String(variant[key]));
      });
      values[key] = Array.from(set);
    });
    return values;
  }, [variants, optionKeys]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  // find the variant that matches all selected options
  const matchedVariant = useMemo(() => {
    return variants.find((variant) => {
      for (const key of optionKeys) {
        if (!selectedOptions[key]) return false;
        if (variant[key] !== selectedOptions[key]) return false;
      }
      return true;
    });
  }, [variants, selectedOptions, optionKeys]);

  // notify parent whenever matched variant changes
  useEffect(() => {
    if (onVariantSelect) {
      onVariantSelect(matchedVariant);
    }
  }, [matchedVariant, onVariantSelect]);

  // build a readable string like "Black + 128GB"
  const selectedComboLabel = useMemo(() => {
    if (Object.keys(selectedOptions).length === 0) return "";
    return optionKeys
      .map((key) => `${selectedOptions[key] ?? "?"}`)
      .join(" + ");
  }, [selectedOptions, optionKeys]);

  return (
    <div className="space-y-6">
      {optionKeys?.map((key) => (
        <div className="mb-6" key={key}>
          <h3 className="font-medium mb-2 capitalize">{key}</h3>
          <div className="flex flex-wrap gap-2">
            {optionValues[key].map((value) => {
              const isSelected = selectedOptions[key] === value;
              return (
                <button
                  key={value}
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [key]: value,
                    }))
                  }
                  className={`px-4 py-2 cursor-pointer transition-all rounded-md border ${
                    isSelected
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-neutral-700 border-neutral-200"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="font-medium">
        {Object.keys(selectedOptions).length === optionKeys.length ? (
          matchedVariant ? (
            <p className="text-green-600">{matchedVariant.stock} In Stock</p>
          ) : (
            <p>
              {selectedComboLabel} is{" "}
              <span className="text-red-600">unavailable</span>
            </p>
          )
        ) : (
          <p className="text-neutral-500 font-normal">
            Please select all options
          </p>
        )}
      </div>
    </div>
  );
};
