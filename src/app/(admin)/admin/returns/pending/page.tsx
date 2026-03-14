import { PendingRequestsMain } from "@page-specific/admin/returns/pending/PendingRequestsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Return Requests | Admin Panel",
};

const PendingRequestsPage = () => <PendingRequestsMain />;

export default PendingRequestsPage;
