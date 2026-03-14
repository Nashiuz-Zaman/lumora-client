import { ReactNode } from "react";
import { AdminOrdersLayoutMain } from "@layout-specific/admin/orders/AdminOrdersLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminOrdersLayoutMain>{children}</AdminOrdersLayoutMain>
);

export default Layout;
