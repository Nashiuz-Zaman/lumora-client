"use client";

import { GridCard, IGridCardImage } from "@shared/GridCard";
import { LinkBtn } from "@buttons/LinkBtn";
import { SlideInOutWrapperX } from "@shared/SlideInOutWrapperX";
import { HTMLAttributes } from "react";
import { CaretRightIcon } from "@/components/shared/icons/CaretRightIcon";

export interface ICategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  heading: string;
  linkText: string;
  linkUrl: string;
  images: IGridCardImage[];
  className?: string;
}

const slideInOutPanelGradient = "bg-white/30 backdrop-blur-[3px]";
const btnClasses = "secondaryClasses !rounded-full";

export const ProductCategoryCard = ({
  heading,
  linkText,
  linkUrl,
  images,
  className = "",
  ...props
}: ICategoryCardProps) => {
  const id = props.id;

  return (
    <div
      id={id}
      className={`bg-white p-5 shadow-xs relative ${className}`}
      {...props}
    >
      {/* Top Heading */}
      <h3 className="text-base sm:text-lg font-semibold mb-3">{heading}</h3>

      {/* Image Grid */}
      <GridCard images={images} />

      <SlideInOutWrapperX
        className={`y-center left-0 right-0 ${slideInOutPanelGradient}`}
        parent={`#${id}`}
      >
        <div className="py-10 flex items-center justify-center">
          <LinkBtn href={linkUrl} className={btnClasses}>
            {linkText} <CaretRightIcon />
          </LinkBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};
