import { RefundsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refunds | Admin Panel",
};

const RefundedPaymentsPage = () => <RefundsMain />;

export default RefundedPaymentsPage;
