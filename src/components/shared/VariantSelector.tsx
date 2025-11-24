"use client";

import { useState, useMemo, useEffect } from "react";
import {
  IVariant,
  getVariantOptionKeys,
  getVariantOptionValues,
  findMatchedVariant,
  buildVariantLabel,
} from "@/utils/productVariantUtils";

export const VariantSelector = ({
  variants,
  onVariantSelect,
  className = "",
}: {
  variants: IVariant[];
  className?: string;
  onVariantSelect?: (variant: IVariant | undefined) => void;
}) => {
  // option keys like color, storage etc.
  const optionKeys = useMemo(() => getVariantOptionKeys(variants), [variants]);

  // unique values for each option
  const optionValues = useMemo(
    () => getVariantOptionValues(variants, optionKeys),
    [variants, optionKeys]
  );

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  // find the variant that matches all selected options
  const matchedVariant = useMemo(
    () => findMatchedVariant(variants, optionKeys, selectedOptions),
    [variants, optionKeys, selectedOptions]
  );

  // notify parent whenever matched variant changes
  useEffect(() => {
    onVariantSelect?.(matchedVariant);
  }, [matchedVariant, onVariantSelect]);

  // readable string like "Black + 128GB"
  const selectedComboLabel = useMemo(
    () => buildVariantLabel(selectedOptions, optionKeys),
    [selectedOptions, optionKeys]
  );

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="space-y-5">
        {optionKeys.map((key) => (
          <div className="" key={key}>
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
      </div>

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
