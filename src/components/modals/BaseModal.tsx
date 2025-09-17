"use client";

import { ReactNode, useRef } from "react";
import { useClickOutside } from "@/hooks";
import { CloseBtn } from "../shared";
import gsap from "gsap";
import { Transition } from "react-transition-group";

interface IBaseModalProps {
  children: ReactNode;
  className?: string;
  condition: boolean;
  closeFunction?: () => void;
  allowCloseOnOutsideClick?: boolean;
  noCloseBtn?: boolean;
  isAnimated?: boolean; // optional, default true
  duration?: number; // animation duration in seconds
}

export const BaseModal = ({
  children,
  className = "",
  condition,
  closeFunction,
  allowCloseOnOutsideClick = true,
  noCloseBtn = false,
  isAnimated = true,
  duration = 0.25,
}: IBaseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <Transition
      in={condition}
      timeout={duration * 1000} // must match GSAP duration
      mountOnEnter
      unmountOnExit
      nodeRef={modalRef}
      onEnter={() => {
        if (isAnimated && modalRef.current) {
          gsap.to(modalRef.current, {
            opacity: 1,
            scale: 1,
            duration,
            ease: "power2.out",
          });
        }
      }}
      onExit={() => {
        if (isAnimated && modalRef.current) {
          gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.8,
            duration,
            ease: "power2.in",
          });
        }
      }}
    >
      <div
        ref={modalRef}
        className={`modal-focus fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-max scale-[0.8] opacity-0 ${className}`}
      >
        {!noCloseBtn && <CloseBtn onClick={closeFunction} />}
        {children}
      </div>
    </Transition>
  );
};
