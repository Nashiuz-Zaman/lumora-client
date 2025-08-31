import { CheckoutPageMain } from "@/components/page-specific/main/checkout/CheckoutPageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Lumora.com",
};

const CheckoutPage = () => {
  return <CheckoutPageMain />;
};

export default CheckoutPage;
