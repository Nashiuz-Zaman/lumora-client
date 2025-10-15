import { PendingRequestMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Return Requests | Admin Panel",
};

const PendingRequestsPage = () => <PendingRequestMain />;

export default PendingRequestsPage;
