"use client";

import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { LoadingIcon } from "../icons";

type ButtonBtnProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
  id?: string;
  type?: "submit" | "button" | "reset";
  title?: string;
  isLoading?: boolean;
  iconClassName?: string;
};

export const ButtonBtn = ({
  children,
  onClick,
  className = "",
  isDisabled = false,
  id,
  type = "submit",
  title = "",
  isLoading = false,
  iconClassName = "",
}: ButtonBtnProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  // 🔑 Native Tailwind spacing classes (all scale with root font-size)
  const allClasses = `
    focus:outline-none flex items-center justify-center w-max
    transition-all rounded-md text-center
    cursor-pointer active:scale-95
    disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed
    border border-neutral-200 primary-classes relative
    px-4 py-2
    sm:px-5 sm:py-2.5
    md:px-6 md:py-3
    lg:px-7 lg:py-3
    xl:px-8 xl:py-4
    ${className}
  `;

  return (
    <button
      title={title}
      {...(id ? { id } : {})}
      type={type}
      style={{ backfaceVisibility: "hidden" }}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
      className={allClasses}
    >
      <span
        className={`w-full capitalize bg-transparent flex items-center justify-center gap-2 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </span>

      {isLoading && (
        <LoadingIcon
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl ${iconClassName}`}
        />
      )}
    </button>
  );
};
