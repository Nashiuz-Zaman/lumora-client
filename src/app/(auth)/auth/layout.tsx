import { AuthLayoutMain } from "@/components/layout-specific/auth/AuthLayoutMain";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AuthLayoutMain>{children}</AuthLayoutMain>
);

export default Layout;
