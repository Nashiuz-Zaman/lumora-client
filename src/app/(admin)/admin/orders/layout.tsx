import { AdminOrdersLayoutMain } from "@/components/layout-specific/admin";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (

      <AdminOrdersLayoutMain>{children}</AdminOrdersLayoutMain>
   
  );
};

export default Layout;
