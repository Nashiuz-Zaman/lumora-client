"use client";

import { GridCard, IGridCardImage, LinkBtnTrans } from "@/components/shared";

export type TCategoryCardProps = {
  heading: string;
  linkText: string;
  linkUrl: string;
  images: IGridCardImage[];
  className?: string;
};

export const CategoryCard = ({
  heading,
  linkText,
  linkUrl,
  images,
  className = "",
}: TCategoryCardProps) => {
  return (
    <div className={`bg-white p-5 pb-4 shadow-xs ${className}`}>
      {/* Top Heading */}
      <h3 className="text-base sm:text-lg font-semibold mb-3">{heading}</h3>

      {/* Image Grid */}
      <GridCard images={images} className="mb-8" />

      {/* Bottom Link */}
      <LinkBtnTrans href={linkUrl} className="linkClasses transition-all">
        {linkText}
      </LinkBtnTrans>
    </div>
  );
};
