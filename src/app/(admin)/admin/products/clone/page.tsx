// THIS IS A PAGE

import { CloneProductMain } from "@/components/page-specific";
import { InnerContainer, LinkBtn } from "@/components/shared";
import { fetchProductForAdmin } from "@/server-functions/fetchProductForAdmin";
import { IProduct } from "@/types";
import { stripIdsAndResetSku } from "@/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clone A Product | Admin Panel",
};

const CloneProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) => {
  const { productId } = await searchParams;

  let product: IProduct | undefined;

  const response = await fetchProductForAdmin(productId!);

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

  if (response?.success) {
    product = stripIdsAndResetSku(response.data as IProduct);
  }

  return <CloneProductMain product={product} />;
};

export default CloneProductPage;
