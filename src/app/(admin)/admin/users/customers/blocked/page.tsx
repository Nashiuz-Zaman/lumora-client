import { BlockedCustomersMain } from "@page-specific/admin/users/customers/blocked/BlockedCustomersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocked Customers | Admin Panel",
};

const BlockedCustomersPage = () => <BlockedCustomersMain />;

export default BlockedCustomersPage;
