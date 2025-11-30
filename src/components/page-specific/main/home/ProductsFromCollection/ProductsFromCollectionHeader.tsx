"use client";

import {
  ButtonBtnTrans,
  CaretLeftIcon,
  CaretRightIcon,
  SectionHeading,
  SectionTagline,
} from "@/components/shared";
import { TCustomSwiperProps } from "@/components/shared";
import { useProductSearchParamsManagement } from "@/hooks";
import { ICategoryTreeItem } from "@/types";

export interface IProductsFromCollectionHeaderProps {
  title: string;
  tagline?: string;
  navigation: TCustomSwiperProps<any>["navigation"];
  topCategorySlug?: string;
  categoryTree?: ICategoryTreeItem[];
  className?: string;
}

export const ProductsFromCollectionHeader = ({
  title,
  tagline,
  navigation,
  topCategorySlug,
  categoryTree,
  className = "",
}: IProductsFromCollectionHeaderProps) => {
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <div className={`mb-6 flex items-start text-left ${className}`}>
      <div>
        <SectionHeading>{title}</SectionHeading>
        {tagline && <SectionTagline className="mt-2">{tagline}</SectionTagline>}

        {topCategorySlug && categoryTree && (
          <ButtonBtnTrans
            onClick={() =>
              handleCategoryClick({
                type: "top",
                topSlug: topCategorySlug,
                categories: categoryTree,
              })
            }
            className="mt-5 underline text-primary"
          >
            See All
          </ButtonBtnTrans>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button
          className={`${navigation?.prevEl.replace(
            ".",
            ""
          )} w-10 h-10 flex items-center justify-center rounded-full primaryLightClasses cursor-pointer scaleOnHover shadow-md transition-all`}
        >
          <CaretLeftIcon />
        </button>
        <button
          className={`${navigation?.nextEl.replace(
            ".",
            ""
          )} w-10 h-10 flex items-center justify-center rounded-full primaryLightClasses scaleOnHover cursor-pointer shadow-md transition-all`}
        >
          <CaretRightIcon />
        </button>
      </div>
    </div>
  );
};
