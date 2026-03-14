import { ExpiredCouponsMain } from "@page-specific/admin/coupons/expired/ExpiredCouponsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expired Coupons | Admin Panel",
};

const ExpiredCouponsPage = () => <ExpiredCouponsMain />;

export default ExpiredCouponsPage;
