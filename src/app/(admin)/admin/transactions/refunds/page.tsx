import { RefundsMain } from "@page-specific/admin/transactions/refunds/RefundsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refunds | Admin Panel",
};

const RefundedPaymentsPage = () => <RefundsMain />;

export default RefundedPaymentsPage;
