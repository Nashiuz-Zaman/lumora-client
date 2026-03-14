import { AdminAnalyticsLayoutMain } from "@layout-specific/admin/analytics/AdminAnalyticsLayoutMain";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <AdminAnalyticsLayoutMain>{children}</AdminAnalyticsLayoutMain>
);

export default Layout;
