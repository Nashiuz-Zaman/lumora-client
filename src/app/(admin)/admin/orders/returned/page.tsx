import { ReturnedOrdersMain } from "@page-specific/admin/orders/returned/ReturnedOrdersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returned Orders | Admin Panel",
};

const ReturnedOrdersPage = () => <ReturnedOrdersMain />;

export default ReturnedOrdersPage;
