import { PaymentResultPageMain } from "@/components/page-specific/main/payment-result/PaymentResultPageMain";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Result",
};

const PaymentResultPage = () => {
  return (
    <Suspense>
      <PaymentResultPageMain />
    </Suspense>
  );
};

export default PaymentResultPage;
