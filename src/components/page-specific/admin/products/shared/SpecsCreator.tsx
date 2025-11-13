"use client";

import { useFormContext, useFieldArray } from "react-hook-form";

import { ElementType } from "react";
import { IProduct } from "@/types";
import {
  ButtonBtnTrans,
  InputField,
  NoData,
  PlusIcon,
  TrashcanIcon,
} from "@/components/shared";

type TSpecsCreatorProps = {
  heading?: string;
  headingTag?: ElementType;
  specSetsAllowed?: number;
  className?: string;
};

const SpecsCreator = ({
  heading = "Specifications",
  headingTag: HeadingTag = "h3",
  specSetsAllowed = 10,
  className,
}: TSpecsCreatorProps) => {
  const { control, register } = useFormContext<IProduct>();

  // useFieldArray for "specifications"
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  return (
    <div
      className={`p-5 bg-white border border-neutral-200 rounded-xl ${className}`}
    >
      {/* Heading and Add Button */}
      <div className="flex items-center justify-between mb-1">
        <HeadingTag className="font-semibold text-xl">{heading}</HeadingTag>
        {fields.length < specSetsAllowed && (
          <ButtonBtnTrans
            className="!text-primary"
            type="button"
            onClick={() => append({ key: "", value: "" })}
          >
            <PlusIcon /> Add a specification
          </ButtonBtnTrans>
        )}
      </div>

      <p className="text-sm text-neutral-400">
        Add specifications e.g width, length, capacity, color etc.
      </p>

      {/* Empty State */}
      {fields.length < 1 && (
        <div className="min-h-[15rem] relative">
          <NoData centered={true} text="No specification for this product" />
        </div>
      )}

      {/* Specification Inputs */}
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="grid grid-cols-[1.75fr_2fr] items-start gap-x-8 gap-y-5 mt-5"
        >
          <div className="flex items-center gap-4">
            <button
              title="Delete Spec"
              type="button"
              onClick={() => remove(i)}
              className="text-red-600"
            >
              <TrashcanIcon />
            </button>

            <InputField
              {...register(`specifications.${i}.key` as const, {
                required: "Specification name is required",
              })}
              inputClassName="rounded-md"
              placeholder="Spec Name"
            />
          </div>

          <InputField
            {...register(`specifications.${i}.value` as const, {
              required: "Specification value is required",
            })}
            inputClassName="rounded-md"
            placeholder="Spec Value"
          />
        </div>
      ))}
    </div>
  );
};

export default SpecsCreator;
