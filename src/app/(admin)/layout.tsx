import { AdminLayoutMain } from "@/components/layout-specific/admin";
import { UserRoles } from "@/constants";
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { admin, superAdmin } = UserRoles;
  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <AdminLayoutMain>{children}</AdminLayoutMain>
    </ProtectedRouteProvider>
  );
};

export default Layout;
