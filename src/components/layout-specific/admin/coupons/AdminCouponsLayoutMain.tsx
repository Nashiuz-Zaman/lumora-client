"use client";

import { ReactNode } from "react";

// Shared components
import { TopPanel } from "@/components/page-specific";

export const AdminCouponsLayoutMain = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Reusable top panel */}
      <TopPanel />

      {/* Main content */}
      <div className="grow flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
};
