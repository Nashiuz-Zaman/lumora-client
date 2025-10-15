"use client";

// Core
import { ReactNode } from "react";

// Components
import { AdminHeader } from "./AdminHeader";
import { AdminSideNavbar } from "./AdminSideNavbar";
import { MobileAdminSideNavbar } from "./MobileAdminSideNavbar";
import { useDynamicHeight, useRefState } from "@/hooks";

export const AdminLayoutMain = ({ children }: { children: ReactNode }) => {
  const { refs } = useRefState();

  const height = useDynamicHeight({
    refElements: [refs.adminHeader],
  });

  return (
    <div className="h-screen flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <AdminHeader />

      <main
        style={{ height: `${height}px` }}
        className="grow grid grid-cols-1 xl:grid-cols-[19rem_1fr] items-stretch relative lg:static"
      >
        {/* Sm screen drawer navbar */}
        <MobileAdminSideNavbar />

        {/* Lg screen Navbar */}
        <div className="overflow-y-auto h-full w-full hidden xl:block border-r border-neutral-200 pr-2 py-2">
          <AdminSideNavbar />
        </div>

        {/* Page content */}
        <div className="max-h-full overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
