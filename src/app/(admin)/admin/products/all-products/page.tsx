import { AllProductsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Admin Panel",
};

const AdminDatabaseAllProductsPage = () => <AllProductsMain />;

export default AdminDatabaseAllProductsPage;
