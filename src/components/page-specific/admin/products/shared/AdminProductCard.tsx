"use client";

import Image from "next/image";

import { formatPrice } from "@/utils";
import { InputCheckbox } from "@/components/shared";
import { IProduct } from "@/types";
import { TUseSelectableReturn } from "@/hooks";

interface IAdminProductCardProps {
  product: IProduct;
  isSelected: boolean;
  className?: string;
  toggleSelectOne?: TUseSelectableReturn<IProduct, "_id">["toggleSelectOne"];
}

const AdminProductCard = ({
  product,
  isSelected,
  toggleSelectOne,
  className,
}: IAdminProductCardProps) => {
  return (
    <div
      key={product._id}
      className={`rounded-xl border border-neutral-100 shadow-sm w-full max-h-[18rem] h-full py-4 px-3 bg-white transition flex flex-col items-center text-center ${className}`}
    >
      {/* Checkbox */}
      <InputCheckbox
        name={`select-${product._id}`}
        checked={isSelected}
        onChange={() => toggleSelectOne?.(product)}
        checkboxClassName="w-5 aspect-square"
        className="ml-auto"
      />

      {/* Image */}
      <div className="relative h-[6rem] mb-3">
        {product.defaultImage ? (
          <Image
            src={product.defaultImage}
            alt={product.title}
            className="w-full h-full object-contain"
            width={200}
            height={200}
          />
        ) : (
          <p className="text center !center-abs">No image found</p>
        )}
      </div>

      {/* Title */}

      <div className="mb-3 w-full">
        <h4 title={product.title} className="font-medium line-clamp-2">
          {product.title}
        </h4>
      </div>

      {/* Metadata */}
      <p className="text-sm mb-1 mt-auto">
        Total Variants: {product.totalVariants}
      </p>
      <p className="text-sm mb-1">Total Stock: {product.totalStock}</p>
      <p className="text-sm text-primary font-medium">
        {formatPrice(product.defaultPrice)}
      </p>
    </div>
  );
};

export default AdminProductCard;
