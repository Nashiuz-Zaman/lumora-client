"use client";

import { ReactNode } from "react";

interface ISectionTaglineProps {
  children: ReactNode;
  className?: string;
}

export const SectionTagline = ({
  children,
  className = "",
}: ISectionTaglineProps) => {
  return (
    <p
      className={`text-lg xl:text-xl text-neutral-500 ${className}`}
    >
      {children}
    </p>
  );
};
