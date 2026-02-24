import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IUseHeaderScrollAnimOptions {
  hideThreshold?: number;
  triggerStart?: number;
  shadowThreshold?: number;
  duration?: number;
  shadowCSS?: string;
}

export const useHeaderScrollAnim = (
  options: IUseHeaderScrollAnimOptions = {},
) => {
  const {
    triggerStart = 50,
    shadowThreshold = 100,
    duration = 0.2,
    shadowCSS = "0 4px 20px rgba(0, 0, 0, 0.08)",
  } = options;

  const headerRef = useRef<HTMLHeadElement>(null);
  const className = "js-header-scroll-active";

  const unifiedEase = "cubic-bezier(0.25, 1, 0.3, 1)";

  useEffect(() => {
    const id = "header-scroll-anim-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      .header-anim-base {
        transition: transform ${duration}s ${unifiedEase}, 
                    box-shadow ${duration}s ${unifiedEase} !important;
        will-change: transform;
      }
      .${className} {
        box-shadow: ${shadowCSS} !important;
      }
    `;
    document.head.appendChild(style);
  }, [shadowCSS, duration, unifiedEase]);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      const header = headerRef.current;
      header.classList.add("header-anim-base");

      let lastScrollY = window.scrollY;
      let isShadowActive = false;

      const showHideAnim = gsap
        .to(header, {
          y: "-100%",
          paused: true,
          duration: duration,
          ease: "none",
        })
        .reversed(true);

      const handleScroll = () => {
        const current = window.scrollY;
        const delta = current - lastScrollY;

        // Direction detection (1px sensitive)
        if (delta > 0 && current > triggerStart) {
          showHideAnim.play(); // hide
        } else if (delta < 0) {
          showHideAnim.reverse(); // show
        }

        // Shadow toggle
        if (current > shadowThreshold) {
          if (!isShadowActive) {
            header.classList.add(className);
            isShadowActive = true;
          }
        } else if (isShadowActive) {
          header.classList.remove(className);
          isShadowActive = false;
        }

        lastScrollY = current;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    { scope: headerRef },
  );

  return headerRef;
};
