import { AnalyticsOverviewMain } from "@page-specific/admin/analytics/overview/AnalyticsOverviewMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview | Admin Panel",
};

const AdminAnalyticsPage = () => <AnalyticsOverviewMain />;

export default AdminAnalyticsPage;
