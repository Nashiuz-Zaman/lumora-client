"use client";

// components
import Image from "next/image";
import { InputCheckbox, IcfyIcon, LinkBtnTrans } from "@/components/shared";
import ColorBadge from "@/components/shared/ColorBadge";

// utils
import {
  formatPrice,
  getProductStatusTextColor,
  getStatusLabel,
  formatDateTime,
} from "@/utils";

// types
import { ProductStatus, TProductStatusValue } from "@/constants/product";
import { IProduct } from "@/types";
import { TUseSelectableReturn } from "@/hooks";

interface IProductRowProps {
  productData: IProduct;
  isSelected: boolean;
  toggleSelectOne?: TUseSelectableReturn<IProduct, "_id">["toggleSelectOne"];
}

const ProductRow = ({
  productData,
  isSelected,
  toggleSelectOne,
}: IProductRowProps) => {
  // common tailwind classes
  const cellClasses = "font-medium text-sm";

  if (!productData) return null;

  return (
    <>
      {/* Checkbox */}
      <td className={cellClasses + " w-[1.6rem]"}>
        <InputCheckbox
          checked={isSelected}
          onChange={() => toggleSelectOne?.(productData)}
        />
      </td>

      {/* Image and title */}
      <td className={cellClasses}>
        <div className="w-full grid grid-cols-[0.2fr_0.8fr] gap-4 items-center">
          <Image
            src={productData?.defaultImage || ""}
            alt="Product Image"
            width={400}
            height={500}
            className="object-contain w-full h-14"
          />
          <p
            title={productData?.title}
            className="leading-relaxed line-clamp-2"
          >
            {productData?.title}
          </p>
        </div>
      </td>

      {/* Status */}
      <td
        className={
          cellClasses +
          " " +
          getProductStatusTextColor(productData.status as TProductStatusValue)
        }
      >
        {getStatusLabel(
          productData.status as TProductStatusValue,
          ProductStatus
        )}
      </td>

      {/* Brand */}
      <td className={cellClasses}>{productData.brand}</td>

      {/* Price */}
      <td className={cellClasses}>
        {formatPrice(productData.defaultPrice ?? 0)}
      </td>

      {/* total variants */}
      <td className={cellClasses}>{productData.totalVariants}</td>

      {/* Inventory */}
      <td className={cellClasses}>
        {productData.totalStock && productData.totalStock >= 20 ? (
          <ColorBadge className="bg-green-600">
            {productData.totalStock} in stock
          </ColorBadge>
        ) : productData.totalStock && productData.totalStock >= 1 ? (
          <ColorBadge className="bg-orange-500">
            {productData.totalStock} in stock
          </ColorBadge>
        ) : (
          <ColorBadge className="bg-red-600">No Stock</ColorBadge>
        )}
      </td>

      {/* last updated */}
      <td className={cellClasses}>
        {productData.updatedAt && formatDateTime(productData.updatedAt)}
      </td>

      {/* Actions */}
      <td className="flex h-max items-center gap-4">
        <div title="View Preview" onClick={(e) => e.stopPropagation()}>
          <LinkBtnTrans
            target="_blank"
            href={`/products/preview/${productData._id}`}
          >
            <IcfyIcon className="text-xl" icon="ri:eye-fill" />
          </LinkBtnTrans>
        </div>
      </td>
    </>
  );
};

export default ProductRow;
