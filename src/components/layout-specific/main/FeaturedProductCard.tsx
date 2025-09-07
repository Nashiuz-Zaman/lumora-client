"use client";

import { LinkBtnTrans, CaretRightIcon } from "@/components/shared";
import { TProductWithMinimalReviewStats } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { RatingStars } from "@/components/shared";

// Featured product card
export const FeaturedProductCard = ({
  product,
}: {
  product: TProductWithMinimalReviewStats;
}) => (
  <div className="bg-white p-4 flex flex-col gap-2 md:text-xs 3xl:text-sm 4xl:text-base">
    <div className="aspect-square mx-auto h-32 3xl:h-40 rounded-lg overflow-hidden mb-2 3xl:mb-3">
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

    {/* Rating row */}
    <div className="flex items-center gap-1 text-gray-500">
      <RatingStars
        rating={product.averageRating || 0}
        className="text-yellow-400"
      />
      <span>({product.totalReviews || 0})</span>
    </div>

    {/* Price and link */}
    <div className="flex items-center justify-between mt-auto 4xl:text-sm">
      <p>{formatPrice(product.defaultPrice!)}</p>

      <LinkBtnTrans
        href={product.slug ? `/products/${product.slug}` : "#"}
        className="font-medium text-primary !gap-1 hover:underline"
      >
        View product <CaretRightIcon />
      </LinkBtnTrans>
    </div>
  </div>
);
