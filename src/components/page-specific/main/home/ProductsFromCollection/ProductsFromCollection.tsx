import {
  CenterContainer,
  InnerContainer,
  TCustomSwiperProps,
  ProductSwiper,
} from "@/components/shared";
import { fetchCollectionProducts } from "@/server-functions/fetchCollectionProducts";
import {
  ICategoryTreeItem,
  TPopulatedProductInCollectionWithReviewStats,
} from "@/types";
import { ProductsFromCollectionHeader } from "./ProductsFromCollectionHeader";

interface IProductsFromCollectionProps {
  collectionSlug: string;
  title: string;
  tagline?: string;
  className?: string;
  topCategorySlug?: string;
  categoryTree?: ICategoryTreeItem[];
  navigation: TCustomSwiperProps<any>["navigation"];
  [key: string]: any;
}

export const ProductsFromCollection = async ({
  collectionSlug,
  title,
  tagline,
  className = "",
  topCategorySlug,
  categoryTree,
  navigation = {
    nextEl: ".custom-swiper-next",
    prevEl: ".custom-swiper-prev",
  },
  ...props
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
    <CenterContainer {...props}>
      <section className={`w-full ${className}`}>
        <ProductsFromCollectionHeader
          title={title}
          tagline={tagline}
          navigation={navigation}
          topCategorySlug={topCategorySlug}
          categoryTree={categoryTree}
        />

        <ProductSwiper navigation={navigation} products={mergedProducts} />
      </section>
    </CenterContainer>
  );
};
