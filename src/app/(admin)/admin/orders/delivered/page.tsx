import { DeliveredOrdersMain } from "@page-specific/admin/orders/delivered/DeliveredOrdersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivered Orders | Admin Panel",
};

const DeliveredOrdersPage = () => <DeliveredOrdersMain />;

export default DeliveredOrdersPage;
