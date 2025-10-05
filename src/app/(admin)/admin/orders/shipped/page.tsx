import { ShippedOrdersMain } from "@/components/page-specific/admin-dashboard-pages/orders/shipped-orders/ShippedOrderMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipped Orders | Admin Panel",
};

const ShippedOrdersPage = () => <ShippedOrdersMain />;

export default ShippedOrdersPage;
