import { ArchivedOrdersMain } from "@page-specific/admin/orders/archived/ArchivedOrdersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archived Orders | Admin Panel",
};

const ArchivedOrdersPage = () => <ArchivedOrdersMain />;

export default ArchivedOrdersPage;
