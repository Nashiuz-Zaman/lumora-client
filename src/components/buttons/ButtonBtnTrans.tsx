"use client";

import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { IcfyIcon } from "../shared"; // Adjust path if needed

type ButtonBtnTransProps = {
  children: ReactNode,
  onClick?: () => void,
  modifyClasses?: string,
  isDisabled?: boolean,
  isLoading?: boolean,
  id?: string,
  type?: "button" | "submit" | "reset",
  ariaLabel?: string,
  title?: string,
  iconModifyClasses?: string,
};

const ButtonBtnTrans = ({
  children,
  onClick,
  modifyClasses = "",
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

  const allClasses = `relative focus:outline-none flex items-center gap-1 w-max capitalize transition-all duration-default text-center active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed ${modifyClasses}`;

  if (!isClient) return null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering Link
    e.preventDefault(); // Prevent Link navigation
    onClick && onClick();
  };

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
        className={`w-full bg-transparent flex items-center gap-2 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </span>

      {/* Loader Icon */}
      <IcfyIcon
        icon="eos-icons:loading"
        modifyClasses={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl ${
          isLoading ? "block" : "hidden"
        } ${iconModifyClasses}`}
      />
    </button>
  );
};

export default ButtonBtnTrans;
