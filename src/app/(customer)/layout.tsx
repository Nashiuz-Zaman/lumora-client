import { CustomerLayoutMain } from "@layout-specific/customer/CustomerLayoutMain";
import { UserRoles } from "@/constants/user";
import {ProtectedRouteProvider} from "@/providers";
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
