"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BREAKPOINTS, useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

interface IUseHeaderScrollAnimOptions {
  triggerStart?: number;
  shadowThreshold?: number;
  duration?: number;
  shadowCSS?: string;
}

export const useHeaderScrollAnim = (
  options: IUseHeaderScrollAnimOptions = {},
  selector: string = ".animated-header",
) => {
  const {
    triggerStart = 300,
    shadowThreshold = 100,
    duration = 0.25,
    shadowCSS = "0 4px 20px rgba(0, 0, 0, 0.08)",
  } = options;

  const isSmDown = useMediaQuery(BREAKPOINTS.max.sm!);
  const isSmDownRef = useRef(isSmDown);

  useEffect(() => {
    isSmDownRef.current = isSmDown;
  }, [isSmDown]);

  const className = "js-header-scroll-active";
  const ease = "cubic-bezier(0.25, 1, 0.3, 1)";

  // inject styles once
  useEffect(() => {
    const id = "header-scroll-anim-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      .header-anim-base {
        transition: transform ${duration}s ${ease}, 
                    box-shadow ${duration}s ${ease} !important;
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
        ease: "none",
        overwrite: "auto",
      });

    const show = () =>
      gsap.to(header, {
        yPercent: 0,
        duration,
        ease: "none",
        overwrite: "auto",
      });

    const trigger = ScrollTrigger.create({
      start: triggerStart,
      end: "max",

      onEnter: () => {
        if (isSmDownRef.current) return;
        // scroll passed triggerStart
        hide();
      },

      onLeaveBack: () => {
        // scroll above triggerStart
        show();
      },

      onUpdate: (self) => {
        if (isSmDownRef.current) return;

        // direction-based toggle only
        if (self.direction === 1) hide();
        else if (self.direction === -1) show();
      },
    });

    const shadowTrigger = ScrollTrigger.create({
      start: shadowThreshold,
      toggleClass: { targets: header, className },
    });

    return () => {
      trigger.kill();
      shadowTrigger.kill();
    };
  }, []);
};
