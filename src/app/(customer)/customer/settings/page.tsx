import { SettingsMain } from "@page-specific/customer/settings/SettingsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Settings | Customer Panel",
};

const CustomerSettingsPage = () => <SettingsMain />;

export default CustomerSettingsPage;
