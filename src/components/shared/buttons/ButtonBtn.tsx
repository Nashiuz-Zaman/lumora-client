"use client";

import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { LoadingIcon } from "../icons";

interface IButtonBtnProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
  id?: string;
  type?: "submit" | "button" | "reset";
  title?: string;
  isLoading?: boolean;
  iconClassName?: string;
}

export const ButtonBtn = ({
  children,
  onClick,
  className = "",
  isDisabled = false,
  id,
  type = "button",
  title = "",
  isLoading = false,
  iconClassName = "",
}: IButtonBtnProps) => {
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
    focus:outline-none border border-transparent flex items-center justify-center w-max
    transition-all rounded-md text-center
    cursor-pointer active:scale-95
    disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed
    relative gap-2
    px-8 py-3
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
        className={`w-full capitalize bg-transparent flex items-center justify-center gap-[inherit] [font-weight:inherit] ${
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
