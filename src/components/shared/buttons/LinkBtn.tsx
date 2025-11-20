"use client";

import Link from "next/link";
import { ReactNode, MouseEvent, AnchorHTMLAttributes } from "react";

interface ILinkBtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  isExternal?: boolean;
}

export const LinkBtn = ({
  children,
  href,
  className = "",
  target,
  onClick,
  isExternal = false,
  ...props
}: ILinkBtnProps) => {
  const allClasses = `
    flex items-center justify-center gap-2 w-max capitalize transition-all
    rounded-md text-center font-medium focus:outline-none
    px-8 py-3 active:scale-98 ${className}
  `;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={allClasses}
        target={target || "_blank"}
        rel="noreferrer"
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link 
  return (
    <Link
      href={href}
      className={allClasses}
      target={target}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};
