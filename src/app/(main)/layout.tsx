// components
import Header from "@/components/layout-specific/main/Header";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <Header />
      <main className="flex flex-col grow">{children}</main>
    </div>
  );
};

export default MainLayout;
