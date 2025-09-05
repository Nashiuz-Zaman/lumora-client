"use client";

import { useEffect, useRef, ReactNode, RefObject } from "react";
import { gsap } from "gsap";

interface ISlideInOutWrapperXProps {
  parentRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
  className?: string;
}

export const SlideInOutWrapperX = ({
  parentRef,
  children,
  className,
}: ISlideInOutWrapperXProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperChildRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current || !wrapperRef.current || !wrapperChildRef.current)
      return;

    const parent = parentRef.current;
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
          "0.12"
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
          "0.12"
        )
        .to(wrapper, {
          transformOrigin: "left",
        });
    };

    parent.addEventListener("mouseenter", handleEnter);
    parent.addEventListener("mouseleave", handleLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleEnter);
      parent.removeEventListener("mouseleave", handleLeave);
    };
  }, [parentRef]);

  return (
    <div
      ref={wrapperRef}
      className={`absolute scale-x-[0] w-full origin-left z-[500] overflow-hidden ${className}`}
    >
      <div
        ref={wrapperChildRef}
        className="opacity-0 relative translate-y-[100%]"
      >
        {children}
      </div>
    </div>
  );
};
