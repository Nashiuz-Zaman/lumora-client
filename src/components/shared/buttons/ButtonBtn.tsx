"use client";

import { useEffect, useState, ReactNode, MouseEvent } from "react";
import { LoadingIcon } from "../icons";

type ButtonBtnProps = {
  children: ReactNode;
  onClick?: () => void;
  modifyClasses?: string;
  isDisabled?: boolean;
  id?: string;
  type?: "submit" | "button" | "reset";
  title?: string;
  isLoading?: boolean;
  iconModifyClasses?: string;
};

export const ButtonBtn = ({
  children,
  onClick,
  modifyClasses = "",
  isDisabled = false,
  id,
  type = "submit",
  title = "",
  isLoading = false,
  iconModifyClasses = "",
}: ButtonBtnProps) => {
  const [isClient, setIsClient] = useState(false);

  const allClasses = `focus:outline-none flex items-center justify-center w-max transition-all rounded-md text-center px-6 py-2 lg:py-3 lg:px-10 cursor-pointer active:scale-[0.95] 
    disabled:opacity-60 
    disabled:scale-100 
    disabled:hover:scale-100 
    disabled:active:scale-100 
    disabled:!hover:scale-100 
    disabled:!active:scale-100 
    disabled:cursor-not-allowed 
    border primary-classes relative ${modifyClasses}`;

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

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
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl ${iconModifyClasses}`}
        />
      )}
    </button>
  );
};
