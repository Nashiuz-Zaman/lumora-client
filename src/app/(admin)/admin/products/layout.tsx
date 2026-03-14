import { ReactNode } from "react";
import { AdminProductsLayoutMain } from "@layout-specific/admin/products/AdminProductsLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminProductsLayoutMain>{children}</AdminProductsLayoutMain>
);

export default Layout;
