"use client";

import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

export const LinkBtnTrans = ({
  children,
  href = "/",
  className = "",
  target,
  onClick,
  isExternal = false,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
  isExternal?: boolean;
}) => {
 
  const allClasses = `
    flex items-center gap-2 w-max capitalize transition-all text-center font-medium
    px-3 py-1.5
    sm:px-3.5 sm:py-2
    md:px-4 md:py-2.5
    lg:px-4.5 lg:py-3
    xl:px-5 xl:py-3.5
    ${className}
  `;

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={allClasses}
        target={target || "_blank"}
        rel="noopener noreferrer"
        onClick={onClick ? handleClick : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={allClasses}
      onClick={onClick ? handleClick : undefined}
      {...(target ? { target } : {})}
    >
      {children}
    </Link>
  );
};
