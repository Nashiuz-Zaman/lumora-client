import { AdminWelcomePageMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome | Admin Panel",
};

const AdminWelcomePage = () => <AdminWelcomePageMain />;

export default AdminWelcomePage;
