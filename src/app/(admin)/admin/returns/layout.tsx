import { ReactNode } from "react";
import { ReturnsLayoutMain } from "@layout-specific/admin/returns/ReturnsLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => (
  <ReturnsLayoutMain>{children}</ReturnsLayoutMain>
);

export default Layout;
