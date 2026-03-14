import { CustomerWelcomePageMain } from "@page-specific/customer/welcome-page/CustomerWelcomePageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome | Customer Panel",
};

const CustomerWelcomePage = () => <CustomerWelcomePageMain />;

export default CustomerWelcomePage;
