// THIS IS A PAGE

import { CreateProductMain } from "@/components/page-specific";
import { fetchProductForAdmin } from "@/server-functions";
import { IProduct } from "@/types";
import { stripIdsAndResetSku } from "@/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create A Product | Admin Panel",
};

const CreateProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ duplicate?: string }>;
}) => {
  const { duplicate } = await searchParams;

  let product: IProduct | undefined;

  if (duplicate) {
    const response = await fetchProductForAdmin(duplicate);
    if (response?.success) {
      product = stripIdsAndResetSku(response.data) as IProduct;
    }
  }

  return <CreateProductMain product={product} />;
};

export default CreateProductPage;
