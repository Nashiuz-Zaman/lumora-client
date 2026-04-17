"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);

    // initial sync
    media.addEventListener("change", callback);

    return () => media.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
// breakpoints
const rawBreakpoints = {
  "2xs": "360px",
  xs: "480px",
  sm: "640px",
  md: "768px",
  "2md": "850px",
  lg: "1024px",
  "2lg": "1100px",
  "3xl": "1700px",
  "4xl": "1920px",
};

// Build query strings for min/max
const buildQueries = (breakpoints: typeof rawBreakpoints) => {
  const min: Partial<Record<keyof typeof breakpoints, string>> = {};
  const max: Partial<Record<keyof typeof breakpoints, string>> = {};

  for (const [key, value] of Object.entries(breakpoints)) {
    min[key as keyof typeof breakpoints] = `(min-width: ${value})`;
    max[key as keyof typeof breakpoints] = `(max-width: ${value})`;
  }

  return { min, max };
};

export const BREAKPOINTS = Object.freeze({
  ...buildQueries(rawBreakpoints),
});
