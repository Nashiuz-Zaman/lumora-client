"use client";

import React, { useEffect } from "react";
import { ProductCard } from "@/components/shared";
import { InnerContainer } from "@/components/containers";
import CustomSwiper from "@/components/shared/CustomSwiper";
import { useGetRelatedProductsMutation } from "@/lib/redux/apiSlices/products/productsPublicSlice";
import { IProduct } from "@/types/product";

interface IYouMayAlsoLikeProps {
  tags: string[];
}

const productBreakpoints = {
  1568: { slidesPerView: 5 },
  1280: { slidesPerView: 4 },
  768: { slidesPerView: 3 },
  640: { slidesPerView: 2 },
  480: { slidesPerView: 1 },
  0: { slidesPerView: 1 },
};

export const YouMayAlsoLike = ({ tags }: IYouMayAlsoLikeProps) => {
  const [getRelatedProducts, { data: relatedProductsData }] =
    useGetRelatedProductsMutation();

  useEffect(() => {
    if (tags.length > 0) {
      getRelatedProducts(tags);
    }
  }, [tags, getRelatedProducts]);

  const relatedProducts: IProduct[] = relatedProductsData?.success
    ? relatedProductsData.data.products
    : [];

  return (
    <section className="bg-neutral-100 py-10">
      <InnerContainer>
        <CustomSwiper
          breakpoints={productBreakpoints}
          data={relatedProducts}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          renderItem={(item: IProduct) => (
            <ProductCard className="!h-full !border-none" data={item} />
          )}
          spaceBetween={25}
          className="!w-full"
        />
      </InnerContainer>
    </section>
  );
};

export default YouMayAlsoLike;
