"use client";
import { RefObject, useEffect, useState } from "react";

export const useResizeObserver = <T extends HTMLElement>(
  refs: RefObject<T>[]
) => {
  const [entries, setEntries] = useState<(ResizeObserverEntry | null)[]>(
    Array(refs.length).fill(null)
  );

  useEffect(() => {
    // extract current elements only
    const elements = refs.map((r) => r?.current).filter(Boolean) as T[];
    if (!elements.length) return;

    const observer = new ResizeObserver((obsEntries) => {
      setEntries((prev) => {
        const copy = [...prev];
        obsEntries.forEach((entry) => {
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) copy[index] = entry;
        });
        return copy;
      });
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.every((ref) => !!ref?.current)]);

  return entries;
};
