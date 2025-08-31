// app/products/[slug]/page.tsx
import { Metadata } from "next";
import { ProductPagePublicMain } from "@/components/page-specific";
import { getProductForCustomer } from "@/server-functions";
import { InnerContainer, LinkBtn } from "@/components/shared";

// 📝 Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProductForCustomer(slug);

  if ("isError" in result || !result) {
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

const ProductPagePublic = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const result = await getProductForCustomer(slug);

  if ("isError" in result || !result) {
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

  return <ProductPagePublicMain productWithReviewsAndStats={result} />;
};

export default ProductPagePublic;
