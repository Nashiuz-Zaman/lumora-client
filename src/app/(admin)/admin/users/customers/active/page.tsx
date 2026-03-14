import { ActiveCustomersMain } from "@page-specific/admin/users/customers/active/ActiveCustomersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Customers | Admin Panel",
};

const ActiveCustomersPage = () => <ActiveCustomersMain />;

export default ActiveCustomersPage;
