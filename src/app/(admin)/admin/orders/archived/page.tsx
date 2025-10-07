import { ArchivedOrdersMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archived Orders | Admin Panel",
};

const ArchivedOrdersPage = () => <ArchivedOrdersMain />;

export default ArchivedOrdersPage;
