"use client";

// components

import Image from "next/image";
import { InputCheckbox, IcfyIcon, LinkBtnTrans } from "@/components/shared";
import ColorBadge from "@/components/shared/ColorBadge";

// utils
import { formatPrice } from "@/utils/formatPrice";
import { ProductStatus, TProductStatusValue } from "@/constants/product";
import { getProductStatusTextColor, getStatusLabel } from "@/utils/statusUtils";
import { formatDateTime } from "@/utils/formatDateTime";

interface IProductRowProps<T> {
  data: T;
  isSelected: boolean;
  toggleSelectOne?: (item: T, keyField: keyof T & string) => void;
  selectKeyField?: keyof T & string;
}

// the value of the key can be string, number, boolean, undefined anything really so any is safe here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductRow = <T extends Record<string, any>>({
  data: product,
  isSelected,
  toggleSelectOne,
  selectKeyField = "collectionProductId" as keyof T & string,
}: IProductRowProps<T>) => {
  // common tailwind classes
  const cellClasses = "font-medium text-sm";

  if (!product) return null;

  return (
    <>
      {/* Checkbox */}
      <td className={cellClasses + " w-[1.6rem]"}>
        <InputCheckbox
          checked={isSelected}
          onChange={() => toggleSelectOne?.(product, selectKeyField)}
        />
      </td>

      {/* Image and title */}
      <td className={cellClasses}>
        <div className="w-full grid grid-cols-[0.2fr_0.8fr] gap-4 items-center">
          <Image
            src={product?.defaultImage}
            alt="Product Image"
            width={400}
            height={500}
            className="object-contain w-full h-14"
          />
          <p title={product?.title} className="leading-relaxed line-clamp-2">
            {product.title}
          </p>
        </div>
      </td>

      {/* Status */}
      <td
        className={
          cellClasses +
          " " +
          getProductStatusTextColor(product.status as TProductStatusValue)
        }
      >
        {getStatusLabel(product.status as TProductStatusValue, ProductStatus)}
      </td>

      {/* Brand */}
      <td className={cellClasses}>{product.brand}</td>

      {/* Price */}
      <td className={cellClasses}>{formatPrice(product.defaultPrice)}</td>

      {/* total variants */}
      <td className={cellClasses}>{product.totalVariants}</td>

      {/* Inventory */}
      <td className={cellClasses}>
        {product.totalStock >= 20 ? (
          <ColorBadge className="bg-green-600">
            {product.totalStock} in stock
          </ColorBadge>
        ) : product.totalStock >= 1 ? (
          <ColorBadge className="bg-orange-500">
            {product.totalStock} in stock
          </ColorBadge>
        ) : (
          <ColorBadge className="bg-red-600">No Stock</ColorBadge>
        )}
      </td>

      {/* last updated */}
      <td className={cellClasses}>{formatDateTime(product.updatedAt)}</td>

      {/* Actions */}
      <td className="flex h-max items-center gap-4">
        <div title="View Preview" onClick={(e) => e.stopPropagation()}>
          <LinkBtnTrans
            target="_blank"
            href={`/products/preview/${product._id}`}
          >
            <IcfyIcon className="text-xl" icon="ri:eye-fill" />
          </LinkBtnTrans>
        </div>
      </td>
    </>
  );
};

export default ProductRow;
