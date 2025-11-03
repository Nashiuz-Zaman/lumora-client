"use client";

import { useEffect, useState, ReactNode, MouseEvent, Ref } from "react";
import { LoadingIcon } from "../icons";

interface IButtonBtnTransProps {
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
  ref?: Ref<HTMLButtonElement>;
}

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
  ref,
}: IButtonBtnTransProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (type !== "submit") {
      e.preventDefault();
      e.stopPropagation();

      if (onClick) onClick();
    }
  };

  const allClasses = `
    relative focus:outline-none gap-2 w-max capitalize
    transition-color text-center disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer h-max
    ${className}
  `;

  return (
    <button
      ref={ref}
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
