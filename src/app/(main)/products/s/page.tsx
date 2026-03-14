import { Metadata } from "next";
import { Suspense } from "react";
import { SearchProductsMain } from "@page-specific/main/products/search-products/SearchProductsMain";

export const metadata: Metadata = {
  title: "Search Products - Lumora.com",
};

const ProductsSearchPage = async () => {
  return (
    <Suspense>
      <SearchProductsMain />
    </Suspense>
  );
};

export default ProductsSearchPage;
