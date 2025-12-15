import { ReactNode } from "react";
import { AdminUsersLayoutMain } from "@/components/layout-specific/admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminUsersLayoutMain>{children}</AdminUsersLayoutMain>
);

export default Layout;
