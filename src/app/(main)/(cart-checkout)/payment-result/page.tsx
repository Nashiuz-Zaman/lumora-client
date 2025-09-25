import PaymentResultPageMain from "@/components/page-specific/main/payment-result/PaymentResultPageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Result",
};

const PaymentResultPage = () => {
  return <PaymentResultPageMain />;
};

export default PaymentResultPage;
