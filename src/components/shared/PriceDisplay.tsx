"use client";

import { formatPrice } from "@/utils/formatPrice";

interface IPriceDisplayProps {
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  className?: string;
}

export const PriceDisplay = ({
  price,
  oldPrice,
  discountPercentage,
  className = "",
}: IPriceDisplayProps) => {
  const hasDiscount =
    discountPercentage !== undefined && discountPercentage > 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Discount badge */}
      {hasDiscount && (
        <span className="text-green-600 font-semibold text-lg">
          -{discountPercentage}%
        </span>
      )}

      {/* Current price */}
      <span className="text-2xl 2xl:text-3xl font-medium">
        {formatPrice(price)}
      </span>

      {/* Old price */}
      {oldPrice !== undefined && oldPrice > price && (
        <span className="text-neutral-400 line-through text-lg 2xl:text-xl">
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  );
};
