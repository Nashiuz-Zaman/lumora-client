import { ApprovedRequestsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approved Return Requests | Admin Panel",
};

const ApprovedRequestsPage = () => <ApprovedRequestsMain />;

export default ApprovedRequestsPage;
