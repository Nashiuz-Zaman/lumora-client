"use client";

import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

export const LinkBtn = ({
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
    flex items-center gap-2 w-max capitalize transition-all duration-default
    rounded-md text-center font-medium border primary-classes focus:outline-none
    px-4 py-2            /* base spacing */
    sm:px-5 sm:py-2.5
    md:px-6 md:py-3
    lg:px-7 lg:py-3
    xl:px-8 xl:py-4
    active:scale-98
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
        rel="noreferrer"
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
      target={target}
      onClick={onClick ? handleClick : undefined}
    >
      {children}
    </Link>
  );
};
