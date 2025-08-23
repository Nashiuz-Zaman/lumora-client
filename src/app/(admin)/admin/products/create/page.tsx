// THIS IS A PAGE

import { CreateProductMain } from "@/components/page-specific";
import { fetchProductForAdmin } from "@/server-functions";
import { IProduct } from "@/types";

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
    product = response?.success ? response.data : undefined;
  } else {
    product = undefined;
  }

  return <CreateProductMain product={product} />;
};

export default CreateProductPage;
