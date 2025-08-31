import PaymentResultPageMain from "@/components/page-specific/main/payment-result/PaymentResultPageMain";
import { Suspense } from "react";

const PaymentResultPage = () => {
  return (
    <Suspense>
      <PaymentResultPageMain />
    </Suspense>
  );
};

export default PaymentResultPage;
