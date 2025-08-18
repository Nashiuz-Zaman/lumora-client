"use client";

import { ReactNode } from "react";
import { useClickOutside } from "@/hooks";
import { CloseBtn } from "../shared";

interface IBaseModalProps {
  children: ReactNode;
  className?: string;
  condition: boolean;
  closeFunction?: () => void;
  allowCloseOnOutsideClick?: boolean;
  noCloseBtn?: boolean;
}

export const BaseModal = ({
  children,
  className = "",
  condition,
  closeFunction,
  allowCloseOnOutsideClick = true,
  noCloseBtn = false,
}: IBaseModalProps) => {
  // Close modal when clicked outside
  useClickOutside(allowCloseOnOutsideClick && condition, (e: MouseEvent) => {
    if (
      !e.target ||
      !(e.target instanceof HTMLElement) ||
      e.target.closest(".modal-focus") ||
      typeof closeFunction !== "function"
    )
      return;

    closeFunction();
  });

  return (
    <div
      className={`modal-focus fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-max ${className}`}
    >
      {!noCloseBtn && <CloseBtn onClick={closeFunction} />}
      {children}
    </div>
  );
};
