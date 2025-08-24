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
    flex items-center gap-2 w-max capitalize transition-all text-center font-medium h-max
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
