import SearchProductsMain from "@/components/page-specific/main/products/search-products/SearchProductsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Search Results - Lumora.com",
};

const ProductsSearchPage = async () => {
  return <SearchProductsMain />;
};

export default ProductsSearchPage;
