"use client";

// Core
import { ReactNode } from "react";

// Components
export const CustomerLayoutMain = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen grid place-content-center">{children}</div>;
};
