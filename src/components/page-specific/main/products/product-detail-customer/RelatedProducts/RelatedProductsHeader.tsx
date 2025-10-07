"use client";

import { CaretLeftIcon, CaretRightIcon } from "@/components/shared";
import { TCustomSwiperProps } from "@/components/shared";

interface IRelatedProductsHeaderProps {
  navigation: TCustomSwiperProps<any>["navigation"];
  className?: string;
}

export const RelatedProductsHeader = ({
  navigation,
  className = "",
}: IRelatedProductsHeaderProps) => {
  return (
    <div className={`mb-6 flex items-center justify-between ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold  capitalize">
        You may also like
      </h2>

      <div className="flex items-center gap-3">
        <button
          className={`${navigation?.prevEl.replace(
            ".",
            ""
          )} w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark cursor-pointer shadow-md transition`}
        >
          <CaretLeftIcon />
        </button>
        <button
          className={`${navigation?.nextEl.replace(
            ".",
            ""
          )} w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark cursor-pointer shadow-md transition`}
        >
          <CaretRightIcon />
        </button>
      </div>
    </div>
  );
};
