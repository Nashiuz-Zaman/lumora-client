import { CustomerOrdersMain } from "@/components/page-specific/customer/orders/CustomerOrdersMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Customer Panel",
};

const CustomerOrdersPage = () => <CustomerOrdersMain />;

export default CustomerOrdersPage;
