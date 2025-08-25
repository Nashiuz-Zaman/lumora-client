import { AdminLayoutMain } from "@/components/layout-specific/admin";
import { UserRoles } from "@/constants";
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { admin, superAdmin } = UserRoles;
  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <AdminLayoutMain>{children}</AdminLayoutMain>
    </ProtectedRouteProvider>
  );
};

export default Layout;
