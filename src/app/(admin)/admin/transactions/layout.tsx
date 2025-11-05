import { ReactNode } from "react";
import { AdminPaymentsLayoutMain } from "@/components/layout-specific/admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminPaymentsLayoutMain>{children}</AdminPaymentsLayoutMain>
);

export default Layout;
