"use client";

// Core
import { ReactNode } from "react";
import { CustomerHeader } from "./CustomerHeader";
import MobileCustomerSideNavbar from "./MobileCustomerSideNavbar";
import CustomerSideNavbar from "./CustomerSideNavbar";
import { useDynamicHeight, useRefState } from "@/hooks";

// Components
export const CustomerLayoutMain = ({ children }: { children: ReactNode }) => {
  const { refs } = useRefState();

  const height = useDynamicHeight({
    refElements: [refs.adminHeader],
  });

  return (
    <div className="h-screen flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <CustomerHeader />

      <main
        style={{ height: `${height}px` }}
        className="grow grid grid-cols-1 xl:grid-cols-[22rem_1fr] items-stretch relative lg:static"
      >
        {/* Sm screen drawer navbar */}
        <MobileCustomerSideNavbar />

        {/* Lg screen Navbar */}
        <div className="h-full w-full hidden xl:block relative">
          <CustomerSideNavbar className="!rounded-4xl !h-1/2 !w-[90%] overflow-hidden absolute top-10 left-[10%] shadow-lg !border-0" />
        </div>

        {/* Page content */}
        <div className="max-h-full overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
