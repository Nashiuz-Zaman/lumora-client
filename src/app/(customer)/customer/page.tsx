import { CustomerWelcomePageMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome | Customer Panel",
};

const CustomerWelcomePage = () => <CustomerWelcomePageMain />;

export default CustomerWelcomePage;
