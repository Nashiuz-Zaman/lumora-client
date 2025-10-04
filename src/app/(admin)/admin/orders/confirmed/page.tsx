import ConfirmedOrdersMain from "@/components/page-specific/admin-dashboard-pages/orders/confirmed-orders/ConfirmedOrderMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmed Orders | Admin Panel",
};

const ConfirmedOrdersPage = () => <ConfirmedOrdersMain />;

export default ConfirmedOrdersPage;
