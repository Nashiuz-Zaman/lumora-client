import { AdminLayoutMain } from "@/components/layout-specific/admin";
import { UserRoles } from "@/constants";
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
