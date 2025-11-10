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
        className="grow grid grid-cols-1 xl:grid-cols-[19rem_1fr] items-stretch relative lg:static"
      >
        {/* Sm screen drawer navbar */}
        <MobileCustomerSideNavbar />

        {/* Lg screen Navbar */}
        <div className="overflow-y-auto h-full w-full hidden xl:block">
          <CustomerSideNavbar />
        </div>

        {/* Page content */}
        <div className="max-h-full overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
