import { AllProductsMain } from "@page-specific/admin/products/all-products/AllProductsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Admin Panel",
};

const AdminDatabaseAllProductsPage = () => <AllProductsMain />;

export default AdminDatabaseAllProductsPage;
