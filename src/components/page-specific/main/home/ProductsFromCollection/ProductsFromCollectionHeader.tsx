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
  parentCategorySlug?: string;
  categoryTree?: ICategoryTreeItem[];
  className?: string;
}

export const ProductsFromCollectionHeader = ({
  title,
  tagline,
  navigation,
  parentCategorySlug,
  categoryTree,
  className = "",
}: IProductsFromCollectionHeaderProps) => {
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <div className={`mb-6 flex items-start text-left ${className}`}>
      <div>
        <SectionHeading>{title}</SectionHeading>
        {tagline && <SectionTagline className="mt-2">{tagline}</SectionTagline>}

        {parentCategorySlug && categoryTree && (
          <ButtonBtnTrans
            onClick={() =>
              handleCategoryClick({
                type: "top",
                topSlug: parentCategorySlug,
                categories: categoryTree,
              })
            }
            className="mt-5 underline text-neutral-400"
          >
            See All
          </ButtonBtnTrans>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button
          className={`${navigation?.prevEl.replace(
            ".",
            "",
          )} w-10 h-10 relative rounded-full border border-neutral-300 hover:bg-neutral-100 cursor-pointer shadow-md transition-all duration-300 text-neutral-500 active:scale-75`}
        >
          <CaretLeftIcon className="xy-center absolute" />
        </button>
        <button
          className={`${navigation?.nextEl.replace(
            ".",
            "",
          )} w-10 h-10 relative rounded-full border border-neutral-300 hover:bg-neutral-100! text-neutral-500 cursor-pointer shadow-md transition-all duration-300 active:scale-75`}
        >
          <CaretRightIcon className="xy-center absolute"/>
        </button>
      </div>
    </div>
  );
};
