import { AdminAnalyticsLayoutMain } from "@/components/layout-specific/admin";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminAnalyticsLayoutMain>{children}</AdminAnalyticsLayoutMain>
);

export default Layout;
