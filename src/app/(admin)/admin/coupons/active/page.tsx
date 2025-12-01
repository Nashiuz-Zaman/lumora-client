import { ActiveCouponsMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Coupons | Admin Panel",
};

const ActiveCouponsPage = () => <ActiveCouponsMain />;

export default ActiveCouponsPage;
