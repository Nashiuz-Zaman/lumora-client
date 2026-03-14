import { AdminLayoutMain } from "@layout-specific/admin/AdminLayoutMain";
import { UserRoles } from "@/constants/user";
import { ProtectedRouteProvider } from "@/providers";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { admin, superAdmin } = UserRoles;
  return (
    <Suspense>
      <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
        <AdminLayoutMain>{children}</AdminLayoutMain>
      </ProtectedRouteProvider>
    </Suspense>
  );
};

export default Layout;
