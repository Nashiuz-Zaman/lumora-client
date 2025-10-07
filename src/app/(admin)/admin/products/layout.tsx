import { ReactNode } from "react";
import { AdminProductsLayoutMain } from "@/components/layout-specific/admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminProductsLayoutMain>{children}</AdminProductsLayoutMain>
);

export default Layout;
