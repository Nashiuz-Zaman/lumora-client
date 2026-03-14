import { ReactNode } from "react";
import { AdminCouponsLayoutMain } from "@layout-specific/admin/coupons/AdminCouponsLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminCouponsLayoutMain>{children}</AdminCouponsLayoutMain>
);

export default Layout;
