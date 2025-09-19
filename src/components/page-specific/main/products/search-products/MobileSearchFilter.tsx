"use client";

import { useState } from "react";
import {
  AccordionVertical,
  ButtonBtn,
  ButtonBtnTrans,
  InputFieldMinMax,
  CloseIcon,
} from "@/components/shared";
import { ICategoryTreeItem } from "@/types";
import { UseFormSetValue } from "react-hook-form";
import { ISearchPageForm } from "@/hooks";

interface IMobileSearchFiltersProps {
  categories: ICategoryTreeItem[];
  brands: string[];
  watchedValues: ISearchPageForm;
  setValue: UseFormSetValue<ISearchPageForm>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
}

export const MobileSearchFilter = ({
  categories,
  brands,
  watchedValues,
  setValue,
  handleSubmit,
}: IMobileSearchFiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedBrands, setExpandedBrands] = useState(false);

  const toggleAccordion = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="block xl:hidden w-full border-b border-neutral-200">
      {/* Toggle button */}

      <div className="pb-3 flex justify-between items-center">
        <span className="font-semibold text-lg">Filters</span>
        <button
          onClick={() => setFiltersOpen((prev) => !prev)}
          className="text-primary font-medium"
        >
          {filtersOpen ? <CloseIcon className="text-xl" /> : "Open"}
        </button>
      </div>

      {/* Filter dropdown */}
      {filtersOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border-t border-neutral-200 space-y-4 py-4"
        >
          {/* Price Range */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion("price")}
            >
              <h3 className="font-semibold">Price Range</h3>
              <span>{expanded === "price" ? "−" : "+"}</span>
            </div>
            <AccordionVertical
              expanded={expanded === "price"}
              animate
              duration="200ms"
            >
              <div className="mt-2">
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
            </AccordionVertical>
          </div>

          {/* Categories */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion("categories")}
            >
              <h3 className="font-semibold">Categories</h3>
              <span>{expanded === "categories" ? "−" : "+"}</span>
            </div>
            <AccordionVertical
              expanded={expanded === "categories"}
              animate
              duration="200ms"
            >
              <div className="mt-2 space-y-2">
                {categories.map((cat) => {
                  const allSubChecked = cat.subCategories.every(
                    (sub) => watchedValues.subCategory[sub.slug]
                  );
                  const someSubChecked = cat.subCategories.some(
                    (sub) => watchedValues.subCategory[sub.slug]
                  );

                  return (
                    <div key={cat.topCategory.slug} className="pl-2">
                      {/* Top category with checkbox */}
                      <label className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={allSubChecked || someSubChecked}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            cat.subCategories.forEach((sub) =>
                              setValue(`subCategories.${sub.slug}`, checked)
                            );
                          }}
                        />
                        {cat.topCategory.title}
                      </label>

                      {/* Subcategories */}
                      <div className="pl-6 mt-1 space-y-1">
                        {cat.subCategories.map((sub) => (
                          <label
                            key={sub.slug}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={!!watchedValues.subCategory[sub.slug]}
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
                    </div>
                  );
                })}
              </div>
            </AccordionVertical>
          </div>

          {/* Brands */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion("brands")}
            >
              <h3 className="font-semibold">Brands</h3>
              <span>{expanded === "brands" ? "−" : "+"}</span>
            </div>
            <AccordionVertical
              expanded={expanded === "brands"}
              animate
              duration="200ms"
            >
              <div className="mt-2 space-y-1">
                {brands
                  .slice(0, expandedBrands ? brands.length : 5)
                  .map((brand) => (
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
                {brands.length > 5 && (
                  <ButtonBtnTrans
                    type="button"
                    className="text-sm text-primary font-medium hover:underline"
                    onClick={() => setExpandedBrands((prev) => !prev)}
                  >
                    {expandedBrands ? "See Less" : "See More"}
                  </ButtonBtnTrans>
                )}
              </div>
            </AccordionVertical>
          </div>

          {/* Apply Button */}
          <ButtonBtn className="!primaryClasses w-full">
            Apply Filters
          </ButtonBtn>
        </form>
      )}
    </div>
  );
};
