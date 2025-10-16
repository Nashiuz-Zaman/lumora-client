import { RejectedRequestsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejected Return Requests | Admin Panel",
};

const RejectedRequestsPage = () => <RejectedRequestsMain />;

export default RejectedRequestsPage;
