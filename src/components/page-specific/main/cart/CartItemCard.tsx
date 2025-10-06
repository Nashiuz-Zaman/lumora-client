"use client";

import Image from "next/image";
import startCase from "lodash/startCase";
import { TPopulatedCartItem } from "@/types/cart";
import { formatPrice } from "@/utils";
import { useCartActions } from "@/hooks";

export type TUpdateQuantity = (
  product: string,
  variant: string,
  change: number
) => void;

interface ICartItemCardProps {
  item: TPopulatedCartItem;
  updateQuantity: TUpdateQuantity;
  removeItem: (item: TPopulatedCartItem) => void;
}

// --- COMPONENT ---
export const CartItemCard = ({
  item,
  updateQuantity,
  removeItem,
}: ICartItemCardProps) => {
  const { isCartLoading } = useCartActions();

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
    <div className="bg-white rounded-xl border border-neutral-100 p-6 transition-all duration-300 shadow-sm">
      <div className="grid grid-cols-[auto_1fr_0.1fr] gap-6 items-start">
        {/* Thumbnail */}
        <div className="w-24 h-24 overflow-hidden flex items-center justify-center">
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

        {/* Product Info */}
        <div className="min-w-0">
          <h3 className="line-clamp-3 font-semibold mb-2">
            {item.product.title || "Unnamed Product"}
          </h3>

          {/* Variant Details */}
          {variantSpecs?.length > 0 && (
            <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600 mb-3">
              {variantSpecs.map(([key, value]) => (
                <div key={key}>
                  <span className="font-semibold text-primary">
                    {startCase(key)}:
                  </span>{" "}
                  {String(value)}
                </div>
              ))}
            </div>
          )}

          {/* Quantity + Price */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <div className="flex items-center space-x-3">
              <button
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => {
                  if (!item?.product?._id || !item?.variant?._id) return;
                  updateQuantity(item.product._id, item.variant._id, -1);
                }}
                disabled={item.quantity <= 1 || isCartLoading}
              >
                −
              </button>

              <span className="w-12 text-center font-semibold text-lg">
                {item.quantity}
              </span>

              <button
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => {
                  if (!item?.product?._id || !item?.variant?._id) return;
                  updateQuantity(item.product._id, item.variant._id, 1);
                }}
                disabled={
                  item.quantity >= item.variant.stock! || isCartLoading
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

        <button
          title="Remove Product"
          className="w-10 inline-block ml-auto h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 items-center justify-center transition-colors cursor-pointer"
          onClick={() => removeItem(item)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
