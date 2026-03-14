import { CancelledOrdersMain } from "@page-specific/admin/orders/cancelled/CancelledOrderMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Admin Panel",
};

const CancelledOrdersPage = () => <CancelledOrdersMain />;

export default CancelledOrdersPage;
