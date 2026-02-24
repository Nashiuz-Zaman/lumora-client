import { ReactNode, Suspense } from "react";
import Footer from "@/components/layout-specific/main/Footer/Footer";
import HeaderServerWrapper from "@/components/layout-specific/main/HeaderServerWrapper";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col max-w-480 mx-auto">
      <Suspense
        fallback={<div className="h-[100px] w-full bg-white animate-pulse" />}
      >
        <HeaderServerWrapper />
      </Suspense>

      <main className="flex flex-col grow">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
