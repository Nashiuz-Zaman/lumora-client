// THIS IS A PAGE

import { EditProductMain } from "@/components/page-specific";
import { fetchProductForAdmin } from "@/server-functions";
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
  const product = response?.success ? response.data : undefined;

  return <EditProductMain product={product} />;
};

export default EditProductPage;
