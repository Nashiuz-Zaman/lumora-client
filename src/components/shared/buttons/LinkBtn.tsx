"use client";

import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

interface ILinkBtnProps {
  children: ReactNode;
  href?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
  isExternal?: boolean;
  [key: string]: unknown;
}

export const LinkBtn = ({
  children,
  href = "/",
  className = "",
  target,
  onClick,
  isExternal = false,
  ...props
}: ILinkBtnProps) => {
  const allClasses = `
    flex items-center justify-center gap-2 w-max capitalize transition-all
    rounded-md text-center font-medium focus:outline-none
    px-8 py-3
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
        {...props}
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
      {...props}
    >
      {children}
    </Link>
  );
};
