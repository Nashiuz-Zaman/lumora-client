import { SettingsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Settings | Customer Panel",
};

const CustomerSettingsPage = () => <SettingsMain />;

export default CustomerSettingsPage;
