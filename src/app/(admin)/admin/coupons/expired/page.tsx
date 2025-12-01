import { ExpiredCouponsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expired Coupons | Admin Panel",
};

const ExpiredCouponsPage = () => <ExpiredCouponsMain />;

export default ExpiredCouponsPage;
