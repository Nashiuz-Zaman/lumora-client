"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { SelectField } from "@/components/shared";
import { useGetCategoryTreeQuery } from "@/libs/redux/apiSlices/category/categoryApiSlice";
import { IProduct } from "@/types";

export const CategorySelector = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IProduct>();

  const { data: categories = [], error } = useGetCategoryTreeQuery();
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>("");
  const topCategories = categories.map((c) => c.topCategory);
  const subCategories =
    categories.find((c) => c.topCategory._id === selectedTopCategory)
      ?.subCategories || [];

  useEffect(() => {
    setValue("subCategory", "");
  }, [selectedTopCategory, setValue]);

  if (error) return <div>Error loading categories</div>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Top Category */}
      <Controller
        name="topCategory"
        control={control}
        rules={{ required: "Top category is required" }}
        render={({ field }) => (
          <SelectField
            labelTextClassName="font-semibold text-xl"
            {...field}
            labelText="Top Category"
            placeholder="Select top category"
            options={topCategories.map((tc) => ({
              text: tc.title,
              value: tc._id,
            }))}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              field.onChange(e);
              setSelectedTopCategory(e.target.value);
            }}
            error={errors.topCategory?.message as string}
          />
        )}
      />

      {/* Subcategory */}
      <Controller
        name="subCategory"
        control={control}
        rules={{ required: "Subcategory is required" }}
        render={({ field }) => (
          <SelectField
            {...field}
            labelText="Subcategory"
            labelTextClassName="font-semibold text-xl"
            placeholder="Select subcategory"
            options={subCategories.map((sc) => ({
              text: sc.title,
              value: sc._id,
            }))}
            error={errors.subCategory?.message as string}
            disabled={!selectedTopCategory}
          />
        )}
      />
    </div>
  );
};
