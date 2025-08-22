"use client";

import { ReactNode } from "react";
import { useClickOutside } from "@/hooks";

interface IOptionsDropdownProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  setShow?: (show: boolean) => void;
}

export const OptionsDropdown = ({
  children,
  className = "",
  show = false,
  setShow = () => {},
}: IOptionsDropdownProps) => {
  useClickOutside(show, (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".modal-focus")) {
      setShow(false);
    }
  });

  if (!show) return null;

  return (
    <div
      className={`modal-focus w-[12rem] p-5 bg-white shadow-md absolute -bottom-1 right-0 translate-y-full rounded-lg border border-neutral-200 ${className}`}
    >
      {children}
    </div>
  );
};


