// components/layouts/MainLayout.tsx
import Footer from "@/components/layout-specific/main/Footer/Footer";
import Header from "@/components/layout-specific/main/Header";
import { TMegaMenuItem } from "@/components/layout-specific/main/MegaMenu";
import { NoData } from "@/components/shared";
import { fetchMegaMenuData } from "@/server-functions";
import { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const result = await fetchMegaMenuData();

  return (
    <div className="min-h-screen relative flex flex-col max-w-[120rem] mx-auto">
      {"isError" in result || !result ? (
        <NoData
          text="Error in Megamenu data fetch"
          className="text-center mx-auto py-10"
        />
      ) : (
        <Header categories={result.data as TMegaMenuItem[]} />
      )}

      <main className="flex flex-col grow">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
