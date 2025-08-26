// components/layouts/MainLayout.tsx
import Footer from "@/components/layout-specific/main/Footer/Footer";
import Header from "@/components/layout-specific/main/Header";
import { fetchMegaMenuData } from "@/server-functions";
import { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const categories = await fetchMegaMenuData();

  return (
    <div className="min-h-screen relative flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <Header categories={categories} />
      <main className="flex flex-col grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
