"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ISlideInOutWrapperXProps {
  children: ReactNode;
  parent: string; // class or id selector
  className?: string;
}

/**
 * SlideInOutWrapperX
 *
 * A GSAP-powered hover animation wrapper component.
 *
 * @param parent - A CSS selector string for the parent element to attach hover events to.
 *                 Must be a class or ID (e.g. ".my-class" or "#my-id").
 *
 * Note: The parent element must have a non-static position
 *       (e.g. relative, absolute, or fixed) for the animation to render correctly.
 */

export const SlideInOutWrapperX = ({
  children,
  parent,
  className,
}: ISlideInOutWrapperXProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperChildRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!parent || !wrapperRef.current || !wrapperChildRef.current) return;

    // Lookup parent by selector (".class" or "#id")
    const parentEl = document.querySelector(parent) as HTMLElement | null;
    if (!parentEl) return;

    const wrapper = wrapperRef.current;
    const wrapperChild = wrapperChildRef.current;

    const handleEnter = () => {
      const tl1 = gsap.timeline({
        defaults: { ease: "power2.in", duration: 0.2 },
      });
      tl1.to(wrapper, { scaleX: 1 }).to(
        wrapperChild,
        {
          opacity: 1,
          y: "0%",
        },
        "0.16"
      );
    };

    const handleLeave = () => {
      const tl2 = gsap.timeline({
        defaults: { ease: "power2.in", duration: 0.2 },
      });
      tl2
        .to(wrapperChild, {
          opacity: 0,
          y: "100%",
        })
        .to(
          wrapper,
          {
            scaleX: "0",
            transformOrigin: "right",
          },
          "0.16"
        )
        .to(wrapper, { transformOrigin: "left" });
    };

    parentEl.addEventListener("mouseenter", handleEnter);
    parentEl.addEventListener("mouseleave", handleLeave);

    return () => {
      parentEl.removeEventListener("mouseenter", handleEnter);
      parentEl.removeEventListener("mouseleave", handleLeave);
    };
  }, [parent]);

  return (
    <div
      ref={wrapperRef}
      className={`absolute z-500 overflow-hidden ${className}`}
      style={{
        transform: "scaleX(0) translateX(0)",
        transformOrigin: "left",
      }}
    >
      <div
        ref={wrapperChildRef}
        className="relative"
        style={{
          transform: "translateY(100%)",
          opacity: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};
