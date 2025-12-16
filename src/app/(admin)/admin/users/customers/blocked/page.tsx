import { BlockedCustomersMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocked Customers | Admin Panel",
};

const BlockedCustomersPage = () => <BlockedCustomersMain />;

export default BlockedCustomersPage;
