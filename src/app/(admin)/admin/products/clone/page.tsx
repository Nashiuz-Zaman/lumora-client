// THIS IS A PAGE

import { CloneProductMain } from "@/components/page-specific";
import { fetchProductForAdmin } from "@/server-functions";
import { IProduct } from "@/types";
import { stripIdsAndResetSku } from "@/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create A Product | Admin Panel",
};

const CloneProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) => {
  const { productId } = await searchParams;

  let product: IProduct | undefined;

  if (productId) {
    const response = await fetchProductForAdmin(productId);
    if (response?.success) {
      product = stripIdsAndResetSku(response.data) as IProduct;
    }
  }

  return <CloneProductMain product={product} />;
};

export default CloneProductPage;
