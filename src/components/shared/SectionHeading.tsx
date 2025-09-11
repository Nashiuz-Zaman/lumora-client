"use client";

import { ReactNode } from "react";

interface ISectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export const SectionHeading = ({
  children,
  className,
}: ISectionHeadingProps) => {
  return (
    <h2
      className={`text-3xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
};
