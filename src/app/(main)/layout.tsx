// components/layouts/MainLayout.tsx
import Footer from "@/components/layout-specific/main/Footer/Footer";
import Header from "@/components/layout-specific/main/Header";
import { NoData } from "@/components/shared";
import { fetchMegaMenuData } from "@/server-functions";
import { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const categories = await fetchMegaMenuData();

  return (
    <div className="min-h-screen relative flex flex-col max-w-[120rem] mx-auto">
      {!Array.isArray(categories) ? (
        <NoData
          text="Error in Megamenu data fetch"
          className="text-center mx-auto py-10"
        />
      ) : (
        <Header categories={categories} />
      )}

      <main className="flex flex-col grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
