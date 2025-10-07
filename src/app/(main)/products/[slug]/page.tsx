// app/products/[slug]/page.tsx
import { Metadata } from "next";
import { ProductPagePublicMain } from "@/components/page-specific";
import {
  fetchProductForCustomer,
  fetchRelatedProductsForCustomer,
} from "@/server-functions";
import { InnerContainer, LinkBtn } from "@/components/shared";

type TParams = Promise<{ slug: string }>;

// Generate dynamic SEO metadata
export async function generateMetadata(props: {
  params: TParams;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const result = await fetchProductForCustomer(slug, {
    limitFields: [
      "title",
      "seoTitle",
      "seoDescription",
      "canonicalUrl",
      "subtitle",
      "metaKeywords",
    ],
    reviewStats: false,
  });

  if (!result || "isError" in result) {
    return {
      title: "Product Not Found - Lumora",
      description: "The product you are looking for could not be found.",
    };
  }

  const { product } = result;

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.subtitle || "",
    keywords: product.metaKeywords || "",
    alternates: {
      canonical: product.canonicalUrl || undefined,
    },
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.subtitle || "",
      url: product.canonicalUrl || undefined,
    },
  };
}

const ProductPagePublic = async (props: { params: TParams }) => {
  const { slug } = await props.params;
  const result = await fetchProductForCustomer(slug, { reviewStats: true });

  if (!result || "isError" in result) {
    return (
      <InnerContainer className="h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="mb-4">
          The product you are looking for could not be found.
        </p>

        <LinkBtn href="/" className="primaryClasses">
          Go Home
        </LinkBtn>
      </InnerContainer>
    );
  }

  const product = result.product;

  const relatedProductsResult = await fetchRelatedProductsForCustomer(
    product._id!,
    product.topCategory!
  );

  return (
    <ProductPagePublicMain
      relatedProductsResult={relatedProductsResult}
      productWithReviewsAndStats={result}
    />
  );
};

export default ProductPagePublic;
