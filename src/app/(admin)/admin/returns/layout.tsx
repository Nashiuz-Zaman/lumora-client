import { ReactNode } from "react";
import { ReturnsLayoutMain } from "@/components/layout-specific/admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <ReturnsLayoutMain>{children}</ReturnsLayoutMain>
);

export default Layout;
