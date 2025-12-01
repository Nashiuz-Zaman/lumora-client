import { AnalyticsOverviewMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview | Admin Panel",
};

const AdminAnalyticsPage = () => <AnalyticsOverviewMain />;

export default AdminAnalyticsPage;
