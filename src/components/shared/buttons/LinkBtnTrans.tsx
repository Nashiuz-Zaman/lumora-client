"use client";

import Link from "next/link";
import { MouseEvent, AnchorHTMLAttributes } from "react";

interface ILinkBtnTransProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  isExternal?: boolean;
}

export const LinkBtnTrans = ({
  children,
  href = "/",
  className = "",
  target,
  onClick,
  isExternal = false,
  ...props
}: ILinkBtnTransProps) => {
  const allClasses = `
    flex items-center gap-2 w-max capitalize transition-all text-center font-medium h-max
    ${className}
  `;

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.stopPropagation();
    onClick?.(e);
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={allClasses}
        target={target || "_blank"}
        rel="noopener noreferrer"
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal Link
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
