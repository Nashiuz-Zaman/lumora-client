"use client";

import Image from "next/image";
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
  const cellClasses = `text-sm font-medium px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!data) return null;

  return (
    <>
      {/* Product Info */}
      <td className={cellClasses + " gap-4 first:!pl-4 first:md:!pl-6 first:lg:!pl-8"}>
        <Image
          src={data.product.defaultImage!}
          alt={data.product.title || "Product image"}
          width={80}
          height={80}
          className="w-12 md:w-16 lg:w-20 aspect-square object-contain rounded-md border border-neutral-200"
        />

        <div>
          <p className="font-semibold">{data.product.title}</p>
        </div>
      </td>

      {/* Price */}
      <td className={cellClasses}>{formatPrice(data.variant.price!)}</td>

      {/* Quantity */}
      <td className={cellClasses}>x{data.quantity}</td>

      {/* Subtotal */}
      <td className={cellClasses + ' last:!pr-4 last:md:!pr-6 last:lg:!pr-8'}>
        {formatPrice(data.variant.price! * data.quantity)}
      </td>
    </>
  );
};
