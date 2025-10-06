import { DeliveredOrdersMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivered Orders | Admin Panel",
};

const DeliveredOrdersPage = () => <DeliveredOrdersMain />;

export default DeliveredOrdersPage;
