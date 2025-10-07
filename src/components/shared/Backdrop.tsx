"use client";

import { TRootState } from "@/libs/redux/store";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import gsap from "gsap";

interface IBackdropProps {
  isAnimated?: boolean;
  duration?: number;
  zIndex?: number;
}

export const Backdrop = ({
  isAnimated = true,
  duration = 0.25,
  zIndex = 40,
}: IBackdropProps) => {
  const backdropOpen = useSelector(
    (state: TRootState) => state.backdrop.backdropOpen
  );
  const backdropRef = useRef<HTMLDivElement>(null);

  return (
    <Transition
      in={backdropOpen}
      timeout={isAnimated ? duration * 1000 : 0}
      mountOnEnter
      unmountOnExit
      nodeRef={backdropRef}
      onEnter={() => {
        if (isAnimated && backdropRef.current) {
          gsap.to(backdropRef.current, {
            opacity: 1,
            duration,
            ease: "power2.out",
          });
        }
      }}
      onExit={() => {
        if (isAnimated && backdropRef.current) {
          gsap.to(backdropRef.current, {
            opacity: 0,
            duration,
            ease: "power2.in",
          });
        }
      }}
    >
      <div
        ref={backdropRef}
        className={`fixed w-full h-screen opacity-0 bg-black/40 backdrop-blur-xs !z-300`}
        style={{ zIndex }}
      />
    </Transition>
  );
};
