import { ReactNode } from "react";
import { AdminOrdersLayoutMain } from "@/components/layout-specific/admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminOrdersLayoutMain>{children}</AdminOrdersLayoutMain>
);

export default Layout;
