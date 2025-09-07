"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ISlideInOutWrapperXProps {
  children: ReactNode;
  parent: HTMLElement | null;
  className?: string;
}

export const SlideInOutWrapperX = ({
  children,
  parent,
  className,
}: ISlideInOutWrapperXProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperChildRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!parent || !wrapperRef.current || !wrapperChildRef.current) return;

    const wrapper = wrapperRef.current;
    const wrapperChild = wrapperChildRef.current;

    const handleEnter = () => {
      const tl1 = gsap.timeline({
        defaults: { ease: "power2.in", duration: 0.2 },
      });
      tl1
        .to(wrapper, {
          scaleX: 1,
        })
        .to(
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
        .to(wrapper, {
          transformOrigin: "left",
        });
    };

    parent.addEventListener("mouseenter", handleEnter);
    parent.addEventListener("mouseleave", handleLeave);
  }, [parent]);

  return (
    <div
      ref={wrapperRef}
      className={`absolute w-full z-[500] overflow-hidden ${className}`}
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
