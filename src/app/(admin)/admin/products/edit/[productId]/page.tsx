// THIS IS A PAGE

import { EditProductMain } from "@/components/page-specific";
import { InnerContainer, LinkBtn } from "@/components/shared";
import { fetchProductForAdmin } from "@/server-functions";
import { IProduct } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product | Admin Panel",
};

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const response = await fetchProductForAdmin(productId);

  if ("isError" in response || !response) {
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

  const product = response.data as IProduct;

  return <EditProductMain product={product} />;
};

export default EditProductPage;
