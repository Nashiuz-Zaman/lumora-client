import { RejectedRequestsMain } from "@page-specific/admin/returns/rejected/RejectedRequestsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejected Return Requests | Admin Panel",
};

const RejectedRequestsPage = () => <RejectedRequestsMain />;

export default RejectedRequestsPage;
