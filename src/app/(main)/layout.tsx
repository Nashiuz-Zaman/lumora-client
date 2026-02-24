import { ReactNode } from "react";
import Footer from "@/components/layout-specific/main/Footer/Footer";
import HeaderClientWrapper from "@/components/layout-specific/main/HeaderClientWrapper";
import Header from "@/components/layout-specific/main/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col max-w-480 mx-auto">
      <HeaderClientWrapper header={<Header />} />

      <main className="flex flex-col grow">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
