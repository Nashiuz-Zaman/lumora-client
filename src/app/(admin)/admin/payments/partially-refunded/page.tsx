import { RefundedPaymentsMain } from "@/components/page-specific";
import { PaymentStatus } from "@/constants";

export const metadata = {
  title: "Partially Refunded Payments | Admin Panel",
};

const PartiallyRefundedPaymentsPage = () => <RefundedPaymentsMain pageTitle="Partially Refunded Payments" status={PaymentStatus["Partially Refunded"]} />;

export default PartiallyRefundedPaymentsPage;
