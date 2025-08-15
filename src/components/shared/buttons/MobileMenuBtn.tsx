"use client";

import { MouseEvent } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";

const MobileMenuBtn = ({
  onClick,
  className = "",
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) => {
  return (
    <button
      aria-label="Open Mobile Navigation"
      className={`block ${className}`}
      onClick={onClick}
    >
      <HamburgerIcon />
    </button>
  );
};

export default MobileMenuBtn;
