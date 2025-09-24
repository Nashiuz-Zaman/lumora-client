"use client";

import Image from "next/image";
import { ButtonBtn } from "./buttons";
import { formatPrice } from "@/utils";
import { IProduct } from "@/types";
import { CartIcon } from "./icons";
import { RatingStars } from "./RatingStars";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  setIsModalOpen,
  setQuickViewModalData,
} from "@/libs/redux/features/productQuickView/productQuickViewSlice";
import { setBackdropOpen } from "@/libs/redux/features/backdrop/backdropSlice";

type TProductCardData = Partial<IProduct> & {
  averageRating?: number;
  totalReviews?: number;
};

interface IProductCardProps {
  data: TProductCardData;
  className?: string;
}

export const ProductCard = ({ data, className = "" }: IProductCardProps) => {
  const {
    defaultImage,
    defaultPrice,
    defaultOldPrice,
    title,
    brand,
    slug,
    averageRating,
    totalReviews,
  } = data;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setQuickViewModalData(data));
    dispatch(setBackdropOpen(true));
    dispatch(setIsModalOpen(true));
  };

  const savings = defaultOldPrice
    ? Number(defaultOldPrice) - Number(defaultPrice)
    : 0;

  return (
    <Link href={`/products/${slug}`}>
      <div
        className={`group relative flex flex-col p-4 !h-full cursor-pointer hover:-translate-y-1 transition-transform duration-300 ${className}`}
      >
        {/* Discount badge */}
        {savings > 0 && (
          <span className="absolute top-0 left-1 bg-green-600 text-white text-xs font-semibold px-2 py-1 shadow-sm">
            Save {formatPrice(savings)}
          </span>
        )}

        {/* Product Image */}
        <div className="mx-auto mt-3 mb-3.5 w-[7rem] h-[7rem]">
          {defaultImage && (
            <Image
              src={defaultImage}
              alt={title as string}
              width={200}
              height={200}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Title */}
        <div className="mb-2 grow">
          <p
            title={title}
            className="text-sm sm:text-base font-medium text-center text-neutral-700 line-clamp-2"
          >
            {title}
          </p>
        </div>

        {/* Rating row */}
        <div className="mt-auto">
          <div className="flex items-center mt-auto justify-center gap-1 text-neutral-500 mb-2">
            <RatingStars
              rating={averageRating ?? 0}
              className="text-yellow-500"
            />
            <span>({totalReviews})</span>
          </div>

          {/* Pricing */}
          <div className="flex justify-center items-center gap-3 mb-2">
            <span className="font-bold text-base sm:text-lg">
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
            onClick={handleClick}
            title="Add the item to redux"
            className="!primaryOutlinedClasses !rounded-full !py-2 mx-auto !gap-2"
          >
            <CartIcon className="text-xl" /> Add to Cart
          </ButtonBtn>
        </div>
      </div>
    </Link>
  );
};
