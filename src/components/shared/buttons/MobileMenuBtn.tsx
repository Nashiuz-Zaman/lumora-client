"use client";

import { MouseEvent } from "react";
import { CloseIcon, HamburgerIcon } from "../icons";

export const MobileMenuBtn = ({
  onClick,
  className = "",
  isMenuOpen = false,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isMenuOpen: boolean;
}) => {
  return (
    <button
      aria-label="Open Mobile Navigation"
      className={`block ${className}`}
      onClick={onClick}
    >
      {isMenuOpen ? (
        <CloseIcon className="text-3xl" />
      ) : (
        <HamburgerIcon className="text-3xl" />
      )}
    </button>
  );
};
