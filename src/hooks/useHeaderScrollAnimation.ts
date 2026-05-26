"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BREAKPOINTS, useMediaQuery } from "@/hooks/useMediaQuery";

interface IUseHeaderScrollAnimationOptions {
  triggerStart?: number;
  shadowThreshold?: number;
  duration?: number;
  shadowCSS?: string;
}

export const useHeaderScrollAnimation = (
  options: IUseHeaderScrollAnimationOptions = {},
  selector: string = ".animated-header",
) => {
  const {
    triggerStart = 167,
    shadowThreshold = 100,
    duration = 0.4,
    shadowCSS = "0 4px 20px rgba(0, 0, 0, 0.08)",
  } = options;

  const isSmDown = useMediaQuery(BREAKPOINTS.max.sm!);
  const isSmDownRef = useRef(isSmDown);

  useEffect(() => {
    isSmDownRef.current = isSmDown;
  }, [isSmDown]);

  const className = "js-header-scroll-active";
  const ease = "cubic-bezier(0.25, 1, 0.3, 1)";

  // Inject styles once for the shadow transition
  useEffect(() => {
    const id = "header-scroll-anim-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      .header-anim-base {
        transition: box-shadow ${duration}s ${ease} !important;
        will-change: transform;
      }
      .${className} {
        box-shadow: ${shadowCSS} !important;
      }
    `;
    document.head.appendChild(style);
  }, [shadowCSS, duration, ease]);

  useGSAP(() => {
    const header = document.querySelector(selector);
    if (!header) return;

    header.classList.add("header-anim-base");

    if (isSmDownRef.current) {
      gsap.set(header, { yPercent: 0 });
      return;
    }

    const hide = () =>
      gsap.to(header, {
        yPercent: -100,
        duration,
        ease: "power2.out",
      });

    const show = () =>
      gsap.to(header, {
        yPercent: 0,
        duration,
        ease: "power2.out",
      });

    // Native tracking variables
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isSmDownRef.current) return;

      const currentScrollY = window.scrollY;

      // Determine direction (1 for down, -1 for up)
      const direction =
        currentScrollY - lastScrollY >= 20
          ? 1
          : lastScrollY - currentScrollY >= 20
            ? -1
            : 0;

      // 1. Box-Shadow Toggle
      if (currentScrollY >= shadowThreshold) {
        header.classList.add(className);
      } else {
        header.classList.remove(className);
      }

      // 2. Position Animation Toggle
      if (currentScrollY <= triggerStart) {
        show();
      } else if (direction === 1) {
        hide();
      } else if (direction === -1) {
        show();
      }

      // Keep track of previous position
      lastScrollY = currentScrollY;
    };

    // Run once initially to set correct state on page refresh
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSmDown]);
};
