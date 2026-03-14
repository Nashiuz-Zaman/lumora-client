"use client";

import { ReactNode } from "react";

// Shared components
import { TopPanel } from "@page-specific/admin/shared/TopPanel";

export const AdminUsersLayoutMain = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Reusable top panel */}
      <TopPanel />

      {/* Main content */}
      <div className="grow flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
};
