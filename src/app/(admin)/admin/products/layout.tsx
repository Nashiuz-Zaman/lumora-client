import AdminProductsLayoutMain from "@/components/layout-specific/admin/products/AdminProductsLayoutMain";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AdminProductsLayoutMain>{children}</AdminProductsLayoutMain>;
};

export default Layout;
