"use client";

import { ButtonBtnTrans } from "@buttons/ButtonBtnTrans";
import { CaretLeftIcon } from "@icons/CaretLeftIcon";
import { CaretRightIcon } from "@icons/CaretRightIcon";
import { SectionHeading } from "@shared/SectionHeading";
import { SectionTagline } from "@shared/SectionTagline";
import { TCustomSwiperProps } from "@shared/CustomSwiper";
import { useProductSearchParamsManagement } from "@/hooks/useProductSearchParamsManagement";
import { ICategoryTreeItem } from "@/types";
import { ButtonBtn } from "@buttons/ButtonBtn";

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
        <ButtonBtn
          className={`${navigation?.prevEl.replace(
            ".",
            "",
          )} w-10 h-10 p-5! relative rounded-full! primaryLightClasses!  shadow-md transition-all duration-300 active:scale-60!`}
        >
          <CaretLeftIcon className="xy-center absolute" />
        </ButtonBtn>
        <ButtonBtn
          className={`${navigation?.nextEl.replace(
            ".",
            "",
          )} w-10 h-10 p-5! relative rounded-full! primaryLightClasses!  shadow-md transition-all duration-300 active:scale-60!`}
        >
          <CaretRightIcon className="xy-center absolute" />
        </ButtonBtn>
      </div>
    </div>
  );
};
