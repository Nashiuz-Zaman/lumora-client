import SearchProductsMain from "@/components/page-specific/main/products/search-products/SearchProductsMain";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Product Search Results - Lumora.com",
};

const ProductsSearchPage = async () => {
  return (
    <Suspense>
      <SearchProductsMain />
    </Suspense>
  );
};

export default ProductsSearchPage;
