import { ShippedOrdersMain } from "@page-specific/admin/orders/shipped/ShippedOrderMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipped Orders | Admin Panel",
};

const ShippedOrdersPage = () => <ShippedOrdersMain />;

export default ShippedOrdersPage;
