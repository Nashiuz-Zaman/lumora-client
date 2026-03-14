import { PaymentsMain } from "@page-specific/admin/transactions/payments/PaymentsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments | Admin Panel",
};

const PaidPaymentsPage = () => <PaymentsMain />;

export default PaidPaymentsPage;
