"use client";

import {
  CustomSwiper,
  ProductCard,
  TCustomSwiperProps,
} from "@/components/shared";
import { TProductWithMinimalReviewStats } from "@/types";

interface IProductCollectionSwiperProps {
  products: TProductWithMinimalReviewStats[];
  className?: string;
  navigation: TCustomSwiperProps<any>["navigation"];
}

export const ProductSwiper = ({
  products = [],
  className = "",
  navigation = {
    nextEl: ".custom-swiper-next",
    prevEl: ".custom-swiper-prev",
  },
}: IProductCollectionSwiperProps) => {
  if (!products || !products.length) return null;

  return (
    <CustomSwiper
      className={className}
      data={products}
      renderItem={(product) => <ProductCard key={product._id} data={product} />}
      showNavigation
      navigation={navigation}
      spaceBetween={20}
      breakpoints={{
        640: { slidesPerView: 2 },
        856: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
        1700: { slidesPerView: 5 },
      }}
    />
  );
};
