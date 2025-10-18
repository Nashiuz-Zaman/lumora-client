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
      <td className={cellClasses + " gap-4"}>
        <Image
          src={data.product.defaultImage!}
          alt={data.product.title || "Product image"}
          width={80}
          height={80}
          className="w-12 md:w-16 lg:w-20 aspect-square object-contain rounded-md border border-neutral-200"
        />

        <div>
          <p className="font-semibold text-neutral-800">
            {data.product.title}
          </p>
          {data.product.subtitle && (
            <p className="text-neutral-600 text-xs mt-1">
              {data.product.subtitle}
            </p>
          )}
        </div>
      </td>

      {/* Price */}
      <td className={cellClasses + " text-neutral-700"}>
        {formatPrice(data.variant.price!)}
      </td>

      {/* Quantity */}
      <td className={cellClasses + " text-neutral-700"}>
        x{data.quantity}
      </td>

      {/* Subtotal */}
      <td className={cellClasses + " font-semibold text-neutral-900"}>
        {formatPrice(data.variant.price! * data.quantity)}
      </td>
    </>
  );
};
