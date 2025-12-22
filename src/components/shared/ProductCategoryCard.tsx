"use client";

import {
  GridCard,
  IGridCardImage,
  LinkBtn,
  SlideInOutWrapperX,
} from "@/components/shared";
import { HTMLAttributes } from "react";

export interface ICategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  heading: string;
  linkText: string;
  linkUrl: string;
  images: IGridCardImage[];
  className?: string;
}

const slideInOutPanelGradient = "bg-white/30 backdrop-blur-[3px]";
const btnClasses =
  "primaryLightClasses !rounded-md";

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
            {linkText}
          </LinkBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};
