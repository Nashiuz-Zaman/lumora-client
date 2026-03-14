import { ReactNode } from "react";
import { AdminUsersLayoutMain } from "@layout-specific/admin/users/AdminUsersLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminUsersLayoutMain>{children}</AdminUsersLayoutMain>
);

export default Layout;
