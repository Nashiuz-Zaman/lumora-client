import { ReactNode } from "react";
import { AdminPaymentsLayoutMain } from "@layout-specific/admin/payments/AdminPaymentsLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminPaymentsLayoutMain>{children}</AdminPaymentsLayoutMain>
);

export default Layout;
