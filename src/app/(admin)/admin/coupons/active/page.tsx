import { ActiveCouponsMain } from "@page-specific/admin/coupons/active/ActiveCouponsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Coupons | Admin Panel",
};

const ActiveCouponsPage = () => <ActiveCouponsMain />;

export default ActiveCouponsPage;
