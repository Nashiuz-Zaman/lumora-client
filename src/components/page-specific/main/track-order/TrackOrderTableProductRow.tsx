"use client";

import React from "react";
import Image from "next/image";

// utils
import { formatPrice } from "@/utils";
import { TPopulatedCartItem } from "@/types";

interface ITrackOrderTableProductRowProps {
  data: TPopulatedCartItem;
  isLastEl?: boolean;
}

export const TrackOrderTableProductRow = ({
  data,
  isLastEl,
}: ITrackOrderTableProductRowProps) => {
  const cellClasses = `w-full text-2xs 2md:text-xs py-3 ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!data) return null;

  return (
    <>
      {/* Product Info */}
      <td className={cellClasses + " flex items-center gap-4 xs:pr-5 lg:pr-12"}>
        <Image
          src={data.product.defaultImage!}
          alt="product photo"
          width={120}
          height={120}
          className="w-[2.4rem] aspect-square md:w-12 object-contain lg:w-20"
        />

        <div>
          <p className="[font-size:inherit] font-semibold mb-1">
            {data.product.title}
          </p>
          {data.product.subtitle && (
            <p className="[font-size:inherit] text-neutral-600">
              {data.product.subtitle}
            </p>
          )}
        </div>
      </td>

      {/* Price */}
      <td className={cellClasses}>{formatPrice(data.variant.price!)}</td>

      {/* Quantity */}
      <td className={cellClasses}>x{data.quantity}</td>

      {/* Subtotal */}
      <td className={cellClasses + " font-semibold lg:text-sm"}>
        {formatPrice(data.variant.price! * data.quantity)}
      </td>
    </>
  );
};
