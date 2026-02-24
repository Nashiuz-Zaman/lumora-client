"use client";

import { ReactNode } from "react";

interface IColorBadgeProps {
  children: ReactNode;
  className?: string;
}

const ColorBadge = ({ children, className = "" }: IColorBadgeProps) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-md text-neutral-50 ${className}`}
    >
      {children}
    </span>
  );
};

export default ColorBadge;
