"use client";

import { useState } from "react";
import Image from "next/image";

interface IProductImagesProps {
  data: string[];
}

export const ProductImages = ({ data }: IProductImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!data || data.length === 0) return null;

  return (
    <section className="grid grid-cols-[1fr_auto] gap-3 xl:gap-6 items-start aspect-[16/13] overflow-hidden">
      {/* Thumbnails */}
      <div className="overflow-y-auto h-full space-y-2 md:space-y-3 xl:space-y-5 pr-3">
        {data.map((image, i) => (
          <button
            key={image}
            type="button"
            aria-label={`Select product image ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={`w-full p-1.5 block cursor-pointer aspect-square rounded-md border transition-all duration-200 focus:outline-none ${
              i === currentIndex
                ? "border-neutral-400 shadow-md"
                : "border-transparent hover:border-neutral-200"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail image ${i + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-contain rounded-md"
              priority={i === 0} // preload first image for UX
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="w-full aspect-square rounded-md overflow-hidden relative h-full">
        {data.map((image, i) => (
          <div
            key={i}
            className={`absolute w-full h-full inset-0 flex justify-center items-center transition-opacity duration-600 ${
              i === currentIndex
                ? "opacity-100 visible z-10"
                : "opacity-0 invisible"
            }`}
          >
            <Image
              src={image}
              alt={`Product image ${i + 1}`}
              width={1000}
              height={1000}
              className="object-contain w-full h-full"
              // prioritize current image
              priority={i === currentIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
