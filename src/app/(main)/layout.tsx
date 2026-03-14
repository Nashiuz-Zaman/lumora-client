import { ReactNode } from "react";
import Footer from "@layout-specific/main/Footer/Footer";
import HeaderClientWrapper from "@layout-specific/main/HeaderClientWrapper";
import Header from "@layout-specific/main/Header";

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
