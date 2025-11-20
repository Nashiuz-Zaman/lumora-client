"use client";

import { ReactNode, MouseEvent } from "react";
import { LoadingIcon } from "../icons";

interface IButtonBtnTransProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  iconModifyClasses?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export const ButtonBtnTrans = ({
  children,
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
  type = "button",
  iconModifyClasses = "",
  ...props
}: IButtonBtnTransProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (type !== "submit") e.preventDefault();
    onClick?.(e);
  };

  const allClasses = `
    relative focus:outline-none gap-2 w-max capitalize
    transition-color text-center disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer h-max
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={!disabled && !isLoading ? handleClick : undefined}
      disabled={disabled || isLoading}
      className={allClasses}
      style={{ backfaceVisibility: "hidden" }}
      {...props}
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
