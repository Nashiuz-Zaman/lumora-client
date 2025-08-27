"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonBtn } from "./buttons";
import { formatPrice } from "@/utils";
import { IProduct } from "@/types";
import { CartIcon } from "./icons";

interface IProductCardProps {
  data: Partial<IProduct>;
  className?: string;
}

export const ProductCard = ({ data, className = "" }: IProductCardProps) => {
  const { defaultImage, defaultPrice, defaultOldPrice, title, brand, slug } =
    data;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${slug}`);
  };

  const savings = defaultOldPrice
    ? Number(defaultOldPrice) - Number(defaultPrice)
    : 0;

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* Header (Save & Favorite Icon) */}
      <div className="flex justify-between items-center mb-3">
        {savings > 0 && (
          <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            Save {formatPrice(savings)}
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="flex justify-center mb-4">
        {defaultImage && (
          <Image
            src={defaultImage}
            alt={title as string}
            width={160}
            height={160}
            className="w-[8rem] h-[8rem] sm:w-[9rem] sm:h-[9rem] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Title */}
      <p
        title={title}
        className="text-sm sm:text-base font-medium text-center text-neutral-700 line-clamp-2 mb-3"
      >
        {title}
      </p>

      {/* Pricing */}
      <div className="flex justify-center items-center gap-3 mb-3">
        <span className="text-primary font-bold text-base sm:text-lg">
          {formatPrice(defaultPrice!)}
        </span>
        {defaultOldPrice && (
          <span className="line-through text-sm text-neutral-400 sm:text-base">
            {formatPrice(defaultOldPrice)}
          </span>
        )}
      </div>

      {/* Brand */}
      <div
        title="Brand"
        className="text-center text-xs sm:text-sm text-neutral-500 mb-4 font-medium capitalize"
      >
        {brand}
      </div>

      {/* Add to Cart Button */}
      <ButtonBtn
        title="Add the item to cart"
        className="!primaryClasses !rounded-full !py-2 mx-auto"
      >
        <CartIcon className="text-xl" /> Add to Cart
      </ButtonBtn>
    </div>
  );
};
