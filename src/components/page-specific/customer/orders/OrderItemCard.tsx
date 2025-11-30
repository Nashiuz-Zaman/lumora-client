import Image from "next/image";
import { formatPrice } from "@/utils";
import { TPopulatedCartItem } from "@/types";

interface IOrderItemCardProps {
  item: TPopulatedCartItem;
}

export const OrderItemCard = ({ item }: IOrderItemCardProps) => {
  return (
    <div className="grid grid-cols-[1.2fr_4fr] gap-4 items-center p-4">
      <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
        {item.product?.defaultImage && (
          <Image
            src={item.product.defaultImage}
            alt={item.product.title || "Product Image"}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        )}
      </div>

      <div className="w-full wrap-anywhere">
        <p
          title={item.product?.title}
          className="font-medium text-neutral-700 line-clamp-2"
        >
          {item.product?.title}
        </p>
        <p className="font-semibold text-neutral-800">
          {formatPrice(item.variant.price!)}
        </p>
      </div>
    </div>
  );
};
