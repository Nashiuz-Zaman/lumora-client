import { ReactNode } from "react";
import { AdminCouponsLayoutMain } from "@/components/layout-specific/admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminCouponsLayoutMain>{children}</AdminCouponsLayoutMain>
);

export default Layout;
