import { PendingRequestsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Return Requests | Admin Panel",
};

const PendingRequestsPage = () => <PendingRequestsMain />;

export default PendingRequestsPage;
