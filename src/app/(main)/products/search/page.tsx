import SearchProductsMain from "@/components/page-specific/main/products/search-products/SearchProductsMain";
import { Suspense } from "react";

const ProductsSearchPage = () => {
  return (
    <Suspense>
      <SearchProductsMain />
    </Suspense>
  );
};

export default ProductsSearchPage;
