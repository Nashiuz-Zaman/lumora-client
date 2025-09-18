import {
  ButtonBtnTrans,
  CaretLeftIcon,
  CaretRightIcon,
  CenterContainer,
  InnerContainer,
  SectionHeading,
  SectionTagline,
  TCustomSwiperProps,
} from "@/components/shared";
import { fetchCollectionProducts } from "@/server-functions/fetchCollectionProducts";

import { TPopulatedProductInCollectionWithReviewStats } from "@/types";
import { ProductCollectionSwiper } from "./ProductCollectionSwiper";

interface IProductsFromCollectionProps {
  collectionSlug: string;
  title: string;
  tagline?: string;
  className?: string;
  navigation: TCustomSwiperProps<any>["navigation"];
}

export const ProductsFromCollection = async ({
  collectionSlug,
  title,
  tagline,
  className = "",
  navigation = {
    nextEl: ".custom-swiper-next",
    prevEl: ".custom-swiper-prev",
  },
}: IProductsFromCollectionProps) => {
  if (!collectionSlug) return null;

  const result = await fetchCollectionProducts(collectionSlug);

  if (!result || "isError" in result) {
    return (
      <InnerContainer className="h-[12rem] flex items-center justify-center">
        <p className="text-xl font-semibold">
          Products couldn&apos;t be fetched
        </p>
      </InnerContainer>
    );
  }

  const products = result.data
    ?.products as TPopulatedProductInCollectionWithReviewStats[];

  const mergedProducts = products?.map((p) => ({
    ...p.product,
    ...p.reviewStats,
  }));

  return (
    <CenterContainer>
      <section className={`w-full ${className}`}>
        <div className="mb-6 text-center flex items-center md:text-left">
          <div>
            <SectionHeading>{title}</SectionHeading>
            {tagline && (
              <SectionTagline className="mt-2">{tagline}</SectionTagline>
            )}

            <ButtonBtnTrans>See All</ButtonBtnTrans>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              className={`${navigation.prevEl.replace(
                ".",
                ""
              )} w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark cursor-pointer shadow-md transition`}
            >
              <CaretLeftIcon />
            </button>
            <button
              className={`${navigation.nextEl.replace(
                ".",
                ""
              )} w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark cursor-pointer shadow-md transition`}
            >
              <CaretRightIcon />
            </button>
          </div>
        </div>

        <ProductCollectionSwiper
          navigation={navigation}
          products={mergedProducts}
        />
      </section>
    </CenterContainer>
  );
};
