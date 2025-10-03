"use client";
import { RefObject, useEffect, useState } from "react";

export const useResizeObserver = <T extends HTMLElement>(
  ref: RefObject<T> | null
) => {
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      // only one entry for the observed element
      if (entries[0]) setEntry(entries[0]);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return entry;
};
