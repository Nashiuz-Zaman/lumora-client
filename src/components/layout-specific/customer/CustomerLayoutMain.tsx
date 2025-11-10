"use client";

// Core
import { ReactNode } from "react";
import { CustomerHeader } from "./CustomerHeader";

// Components
export const CustomerLayoutMain = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <CustomerHeader />

      {children}
    </div>
  );
};
