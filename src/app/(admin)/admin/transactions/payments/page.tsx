import { PaymentsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments | Admin Panel",
};

const PaidPaymentsPage = () => <PaymentsMain />;

export default PaidPaymentsPage;
