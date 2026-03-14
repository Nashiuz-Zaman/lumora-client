import { AdminWelcomePageMain } from "@page-specific/admin/welcome-page/AdminWelcomePageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome | Admin Panel",
};

const AdminWelcomePage = () => <AdminWelcomePageMain />;

export default AdminWelcomePage;
