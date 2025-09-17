"use client";

import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { LoadingIcon } from "../icons";

type ButtonBtnTransProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  title?: string;
  iconModifyClasses?: string;
};

export const ButtonBtnTrans = ({
  children,
  onClick,
  className = "",
  isDisabled = false,
  isLoading = false,
  id,
  type = "button",
  ariaLabel = "button",
  title,
  iconModifyClasses = "",
}: ButtonBtnTransProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering Link
    e.preventDefault(); // Prevent Link navigation
    onClick?.();
  };

  // 🔑 Use native Tailwind spacing and text classes
  const allClasses = `
    relative focus:outline-none gap-2 w-max capitalize
    transition-all duration-default text-center
    active:scale-98 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed
    hover:cursor-pointer h-max
    ${className}
  `;

  return (
    <button
      {...(title ? { title } : {})}
      {...(id ? { id } : {})}
      type={type}
      style={{ backfaceVisibility: "hidden" }}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
      className={allClasses}
      aria-label={ariaLabel}
    >
      {/* Text Content */}
      <span
        className={`w-full bg-transparent flex items-center gap-[inherit] ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </span>

      {/* Loader Icon */}
      {isLoading && (
        <LoadingIcon
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      text-xl sm:text-2xl md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.75rem]
                      ${iconModifyClasses}`}
        />
      )}
    </button>
  );
};
