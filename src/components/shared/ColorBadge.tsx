"use client";

import { ReactNode } from "react";

interface ColorBadgeProps {
  children: ReactNode;
  className?: string;
}

const ColorBadge = ({ children, className = "" }: ColorBadgeProps) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-md text-white ${className}`}
    >
      {children}
    </span>
  );
};

export default ColorBadge;
