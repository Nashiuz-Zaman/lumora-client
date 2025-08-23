"use client";

import { GridCard, GridCardImage, LinkBtnTrans } from "@/components/shared";

export type CategoryCardProps = {
  heading: string;
  linkText: string;
  images: GridCardImage[];
  className?: string;
};

export const CategoryCard = ({
  heading,
  linkText,
  images,
  className = "",
}: CategoryCardProps) => {
  return (
    <div className={`bg-white p-5 pb-4 ${className}`}>
      {/* Top Heading */}
      <h3 className="text-base sm:text-lg font-semibold mb-3">{heading}</h3>

      {/* Image Grid */}
      <GridCard images={images} className="mb-8" />

      {/* Bottom Link */}
      <LinkBtnTrans className="linkClasses transition-all">
        {linkText}
      </LinkBtnTrans>
    </div>
  );
};
