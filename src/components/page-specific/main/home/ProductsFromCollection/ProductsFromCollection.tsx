import {
  CenterContainer,
  InnerContainer,
  TCustomSwiperProps,
  ProductSwiper,
} from "@/components/shared";
import { fetchCollectionProducts } from "@/server-functions/fetchCollectionProducts";
import { ICategoryTreeItem } from "@/types";
import { ProductsFromCollectionHeader } from "./ProductsFromCollectionHeader";
import { fetchCategoryTree } from "@/server-functions/fetchCategoryTree";

interface IProductsFromCollectionProps {
  collectionSlug: string;
  title: string;
  tagline?: string;
  className?: string;
  parentCategorySlug?: string;
  categoryTree?: ICategoryTreeItem[];
  navigation: TCustomSwiperProps<any>["navigation"];
  [key: string]: any;
}

export const ProductsFromCollection = async ({
  collectionSlug,
  title,
  tagline,
  className = "",
  parentCategorySlug,
  navigation,
  ...props
}: IProductsFromCollectionProps) => {
  if (!collectionSlug) return null;

  // These two requests start in parallel!
  const [productResult, categoryResult] = await Promise.all([
    fetchCollectionProducts(collectionSlug),
    parentCategorySlug ? fetchCategoryTree() : Promise.resolve(undefined),
  ]);

  if (!productResult || "isError" in productResult) {
    return (
      <InnerContainer className="h-48 flex items-center justify-center">
        <p className="text-sm text-gray-500">Products currently unavailable</p>
      </InnerContainer>
    );
  }

  const products = productResult.data?.products || [];
  const categoryTree =
    parentCategorySlug &&
    categoryResult !== undefined &&
    !("isError" in categoryResult)
      ? categoryResult.categoryTree
      : [];

  const mergedProducts = products.map((p: any) => ({
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
          parentCategorySlug={parentCategorySlug}
          categoryTree={categoryTree} // Now populated locally
        />
        
        <ProductSwiper navigation={navigation} products={mergedProducts} />
      </section>
    </CenterContainer>
  );
};
