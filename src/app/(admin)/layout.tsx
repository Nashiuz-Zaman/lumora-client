import { AdminLayoutMain } from "@/components/layout-specific/admin";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AdminLayoutMain>{children}</AdminLayoutMain>;
};

export default Layout;
