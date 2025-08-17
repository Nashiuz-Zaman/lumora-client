"use client";
import { RefObject, useEffect, useRef, useState } from "react";

interface IUseElementHeightReturn {
  ref: RefObject<HTMLElement | null>;
  height: number | null;
}

export const useElementHeight = (): IUseElementHeightReturn => {
  const ref = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    updateHeight(); // measure on mount

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return { ref, height };
};
