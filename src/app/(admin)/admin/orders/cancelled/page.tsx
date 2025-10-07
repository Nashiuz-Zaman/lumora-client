import { CancelledOrdersMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Admin Panel",
};

const CancelledOrdersPage = () => <CancelledOrdersMain />;

export default CancelledOrdersPage;
