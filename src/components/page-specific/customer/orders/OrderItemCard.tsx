import Image from "next/image";
import { formatPrice } from "@/utils";
import { TPopulatedCartItem } from "@/types";

interface IOrderItemCardProps {
  item: TPopulatedCartItem;
}

export const OrderItemCard = ({ item }: IOrderItemCardProps) => {
  return (
    <div className="flex items-center p-4">
      <div className="flex-shrink-0 mr-4">
        <div className="w-16 aspect-square rounded-full flex items-center justify-center overflow-hidden">
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
      </div>

      <div>
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
