import { InnerContainer, NoData } from "@/components/shared";
import { ProductImages } from "./ProductImages";
import { RightSideDetails } from "./RightSideDetails";
import { ProductDetailsTabs } from "./ProductDetailsTab";
// import YouMayAlsoLike from "./YouMayAlsoLike";
import { IProductWithReviewsAndStats } from "@/types/product";
import { Reviews } from "./Reviews";

interface IProductPagePublicMainProps {
  productWithReviewsAndStats?: IProductWithReviewsAndStats;
}

export const ProductPagePublicMain = ({
  productWithReviewsAndStats,
}: IProductPagePublicMainProps) => {
  if (!productWithReviewsAndStats) {
    return (
      <InnerContainer className="!h-screen relative">
        <NoData
          centered
          className="text-xl"
          text="Sorry no product was found. Try refreshing."
        />
      </InnerContainer>
    );
  }

  const { product } = productWithReviewsAndStats;

  return (
    <div className="my-10 3xl:my-14">
      <InnerContainer className="flex flex-col">
        <section className="grid grid-cols-1 2md:grid-cols-[1fr_1.25fr] mb-16 gap-10 lg:gap-6 xl:gap-8 2xl:gap-20">
          {/* left side gallery */}
          <ProductImages data={product.images as string[]} />

          {/* right side text details */}
          <RightSideDetails data={productWithReviewsAndStats} />
        </section>
      </InnerContainer>

      <InnerContainer className="grid grid-cols-1 xl:grid-cols-[5fr_1fr] gap-6">
        <div>
          <ProductDetailsTabs product={product} />
          <Reviews initialData={productWithReviewsAndStats} />
        </div>
      </InnerContainer>

      <InnerContainer className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center 2md:text-left">
          You may also like
        </h2>
        {/* <YouMayAlsoLike tags={productData.tags} /> */}
      </InnerContainer>
    </div>
  );
};
