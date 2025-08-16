"use client";

import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

export const LinkBtn = ({
  children,
  href = "/",
  modifyClasses = "",
  target,
  onClick,
  isExternal = false,
}: {
  children: ReactNode;
  href?: string;
  modifyClasses?: string;
  target?: string;
  onClick?: () => void;
  isExternal?: boolean;
}) => {
  const allClasses =
    "flex items-center gap-2 w-max capitalize transition-all duration-default rounded-md text-center px-6 py-2 lg:py-3 lg:px-10 active:scale-[0.98] font-medium border primary-classes focus:outline-none " +
    modifyClasses;

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
