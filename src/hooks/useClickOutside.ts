"use client";

import { useEffect } from "react";

export const useClickOutside = (
  condition: boolean,
  callbackFunc: (event: MouseEvent) => void
) => {
  useEffect(() => {
    let clickEventTimer: ReturnType<typeof setTimeout>;

    if (condition) {
      clickEventTimer = setTimeout(() => {
        window.addEventListener("mousedown", callbackFunc);
        clearTimeout(clickEventTimer);
      }, 250);
    } else {
      window.removeEventListener("mousedown", callbackFunc);
    }

    return () => {
      clearTimeout(clickEventTimer);
      window.removeEventListener("mousedown", callbackFunc);
    };
  }, [condition, callbackFunc]);
};


