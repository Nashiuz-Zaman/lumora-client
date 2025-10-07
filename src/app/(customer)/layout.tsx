import { CustomerLayoutMain } from "@/components/layout-specific/customer/CustomerLayoutMain";
import { UserRoles } from "@/constants";
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { customer } = UserRoles;
  return (
    <Suspense>
      <ProtectedRouteProvider allowedRoles={[customer]}>
        <CustomerLayoutMain>{children}</CustomerLayoutMain>
      </ProtectedRouteProvider>
    </Suspense>
  );
};

export default Layout;
