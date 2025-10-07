"use client";

import {
  TCustomSwiperProps,
  ProductSwiper,
  InnerContainer,
} from "@/components/shared";
import { TProductWithMinimalReviewStats } from "@/types";
import { RelatedProductsHeader } from "./RelatedProductsHeader";

interface IRelatedProductsProps {
  products: TProductWithMinimalReviewStats[];
  className?: string;
  navigation?: TCustomSwiperProps<any>["navigation"];
  [key: string]: any;
}

export const RelatedProducts = ({
  products,
  className = "",
  navigation = {
    nextEl: ".custom-swiper-next",
    prevEl: ".custom-swiper-prev",
  },
  ...props
}: IRelatedProductsProps) => {
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <InnerContainer {...props}>
      <section className={`w-full ${className}`}>
        <RelatedProductsHeader navigation={navigation} />
        <ProductSwiper navigation={navigation} products={products} />
      </section>
    </InnerContainer>
  );
};
