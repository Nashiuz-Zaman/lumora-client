import { ReturnedOrdersMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returned Orders | Admin Panel",
};

const ReturnedOrdersPage = () => <ReturnedOrdersMain />;

export default ReturnedOrdersPage;
