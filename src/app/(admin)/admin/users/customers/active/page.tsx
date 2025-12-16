import { ActiveCustomersMain } from "@/components/page-specific/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Customers | Admin Panel",
};

const ActiveCustomersPage = () => <ActiveCustomersMain />;

export default ActiveCustomersPage;
