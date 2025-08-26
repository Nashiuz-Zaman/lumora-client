import { LinkBtnTrans, RightCaretIcon } from "@/components/shared";
import { IProduct } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";

// Featured product card
export const FeaturedProductCard = ({
  product,
}: {
  product: Partial<IProduct>;
}) => (
  <div className="bg-white p-4 flex flex-col gap-2 text-xs 3xl:text-sm 4xl:text-base">
    <div className="relative w-full h-32 3xl:h-40 rounded-lg overflow-hidden mb-2 3xl:mb-3">
      <Image
        src={product.defaultImage!}
        alt={product.title!}
        width={600}
        height={600}
        className="object-contain w-full h-full"
      />
    </div>

    <h5 title={product.title} className="font-semibold line-clamp-2">
      {product.title}
    </h5>

    {/* Price and link */}
    <div className="flex items-center justify-between mt-auto 4xl:text-sm">
      <p >{formatPrice(product.defaultPrice!)}</p>

      <LinkBtnTrans
        href={product.slug ? `/product/${product.slug}` : "#"}
        className="font-medium text-primary !gap-1 hover:underline"
      >
        View product <RightCaretIcon />
      </LinkBtnTrans>
    </div>
  </div>
);
