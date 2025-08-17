"use client";

// Core
import { ReactNode } from "react";

// Hooks
import { useElementHeight } from "@/hooks/useElementHeight";

// Components
import { AdminHeader } from "./AdminHeader";
import { AdminSideNavbar } from "./AdminSideNavbar";

export const AdminLayoutMain = ({ children }: { children: ReactNode }) => {
  const { ref: headerRef, height } = useElementHeight();

  return (
    <div className="h-screen flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <AdminHeader ref={headerRef} />

      {height !== null && (
        <main
          className="grow grid grid-cols-1 xl:grid-cols-[19rem_1fr] relative lg:static"
          style={{ height: `calc(100vh - ${height}px)` }}
        >
          {/* Sm screen drawer navbar */}

          {/* Lg screen Navbar */}
          <div className="overflow-y-auto w-full hidden xl:block border-r border-neutral-200 pr-2 py-2">
            <AdminSideNavbar />
          </div>

          {/* Page content */}
          <div className="overflow-y-auto flex flex-col">{children}</div>
        </main>
      )}
    </div>
  );
};
