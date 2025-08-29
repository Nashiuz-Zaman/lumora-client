"use client";

import { useState } from "react";
import {
  AccordionVertical,
  ButtonBtn,
  ButtonBtnTrans,
  InputFieldMinMax,
} from "@/components/shared";
import { ICategoryTreeItem } from "@/types";
import { UseFormSetValue } from "react-hook-form";
import { ISearchPageProductsForm } from "@/hooks";

interface ISearchFiltersProps {
  categories: ICategoryTreeItem[];
  brands: string[];
  watchedValues: ISearchPageProductsForm;
  setValue: UseFormSetValue<ISearchPageProductsForm>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
}

export const SearchFilters = ({
  categories,
  brands,
  watchedValues,
  setValue,
  handleSubmit,
}: ISearchFiltersProps) => {
  const [expandedBrands, setExpandedBrands] = useState<boolean>(false);
  const [expandedAccordions, setExpandedAccordions] = useState<
    Record<string, boolean>
  >(
    () =>
      categories?.reduce(
        (acc, cat) => ({
          ...acc,
          [cat.topCategory.slug]: cat.subCategories.some(
            (sub) => watchedValues.subCategories[sub.slug]
          ),
        }),
        {}
      ) || {}
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 hidden xl:block">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <InputFieldMinMax
          min={0}
          max={50000}
          step={10}
          prefix="$"
          labelMin="Min Price"
          labelMax="Max Price"
          onChange={(minVal, maxVal) => {
            setValue("priceMin", minVal);
            setValue("priceMax", maxVal);
          }}
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((cat) => {
          const allSubChecked = cat.subCategories.every(
            (sub) => watchedValues.subCategories[sub.slug]
          );
          const someSubChecked = cat.subCategories.some(
            (sub) => watchedValues.subCategories[sub.slug]
          );

          return (
            <div key={cat.topCategory.slug} className="mb-2">
              {/* Top Category Title and Checkbox */}
              <div
                className="flex items-center justify-between cursor-pointer mb-1"
                onClick={() =>
                  setExpandedAccordions((prev) => ({
                    ...prev,
                    [cat.topCategory.slug]: !prev[cat.topCategory.slug],
                  }))
                }
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allSubChecked || someSubChecked}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      cat.subCategories.forEach((sub) =>
                        setValue(`subCategories.${sub.slug}`, checked)
                      );
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="font-semibold">{cat.topCategory.title}</span>
                </label>
                <span>
                  {expandedAccordions[cat.topCategory.slug] ? "-" : "+"}
                </span>
              </div>

              {/* Accordion for Subcategories */}
              <AccordionVertical
                expanded={expandedAccordions[cat.topCategory.slug]}
                animate
                duration="150ms"
              >
                <div className="flex flex-col space-y-1 pl-4">
                  {cat.subCategories.map((sub) => (
                    <label
                      key={sub.slug}
                      className="flex items-center gap-2 pl-4"
                    >
                      <input
                        type="checkbox"
                        checked={!!watchedValues.subCategories[sub.slug]}
                        onChange={(e) =>
                          setValue(
                            `subCategories.${sub.slug}`,
                            e.target.checked
                          )
                        }
                      />
                      {sub.title}
                    </label>
                  ))}
                </div>
              </AccordionVertical>
            </div>
          );
        })}
      </div>

      {/* Brands */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Brands</h3>

          {brands?.length > 5 && (
            <ButtonBtnTrans
              type="button"
              className="text-sm text-primary font-medium hover:underline cursor-pointer"
              onClick={() => setExpandedBrands((prev) => !prev)}
            >
              {expandedBrands ? "See Less" : "See More"}
            </ButtonBtnTrans>
          )}
        </div>

        <AccordionVertical
          expanded={expandedBrands}
          animate
          duration="150ms"
          previewHeight={200}
        >
          <div className="space-y-1">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!watchedValues.brands[brand]}
                  onChange={(e) =>
                    setValue(`brands.${brand}`, e.target.checked)
                  }
                />
                {brand}
              </label>
            ))}
          </div>
        </AccordionVertical>
      </div>

      {/* Apply Filters Button */}
      <ButtonBtn className="!primaryClasses">Apply Filters</ButtonBtn>
    </form>
  );
};
