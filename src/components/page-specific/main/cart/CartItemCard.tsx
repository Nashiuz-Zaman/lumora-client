"use client";

import Image from "next/image";
import { TPopulatedCartItem } from "@/types/cart";
import { formatPrice } from "@/utils";
import { useCartActions } from "@/hooks";

export type TUpdateQuantity = (
  productId: string,
  variantId: string,
  change: number
) => void;

interface ICartItemCardProps {
  item: TPopulatedCartItem;
  updateQuantity: TUpdateQuantity;
  removeItem: (item: TPopulatedCartItem) => void;
}

export const CartItemCard = ({
  item,
  updateQuantity,
  removeItem,
}: ICartItemCardProps) => {
  const { isCartUpdating } = useCartActions();
  console.log(item);

  const excludedKeys = [
    "_id",
    "id",
    "sku",
    "price",
    "oldPrice",
    "discountPercentage",
    "stock",
  ];
  const variantSpecs = Object.entries(item.variant).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-neutral-100 shadow-lg">
            {item.product.defaultImage ? (
              <Image
                src={item.product.defaultImage}
                alt={item.product.title || "Product Image"}
                width={300}
                height={300}
                className="object-contain w-full h-full"
              />
            ) : (
              <span className="text-white text-3xl">No Image</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="line-clamp-3 font-semibold mb-2">
            {item.product.title || "Unnamed Product"}
          </h3>

          {/* Variant Details */}
          {variantSpecs.length > 0 && (
            <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600 mb-3">
              {variantSpecs.map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span> {String(value)}
                </div>
              ))}
            </div>
          )}

          {/* Quantity + Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  updateQuantity(
                    item.product._id as string,
                    item.variant._id as string,
                    -1
                  )
                }
                disabled={item.quantity <= 1 || isCartUpdating}
              >
                −
              </button>

              <span className="w-12 text-center font-semibold text-lg">
                {item.quantity}
              </span>

              <button
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  updateQuantity(
                    item.product._id as string,
                    item.variant._id as string,
                    1
                  )
                }
                disabled={
                  item.quantity >= (item.variant.stock ?? Infinity) ||
                  isCartUpdating
                }
              >
                +
              </button>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold mb-1">
                {formatPrice((item.variant.price ?? 0) * item.quantity)}
              </div>
              <div className="text-sm text-neutral-500">
                {formatPrice(item.variant.price ?? 0)} each
              </div>
            </div>
          </div>
        </div>

        {/* Remove */}
        <div className="flex-shrink-0">
          <button
            className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
            onClick={() => removeItem(item)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
