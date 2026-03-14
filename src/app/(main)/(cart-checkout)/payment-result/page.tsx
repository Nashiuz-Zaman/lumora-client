import { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResultPageMain } from "@page-specific/main/payment-result/PaymentResultPageMain";

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
