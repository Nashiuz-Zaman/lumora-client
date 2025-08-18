"use client";
import { RefObject, useEffect, useRef, useState } from "react";

interface IUseElementHeightReturn<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  height: number | null;
}

export const useElementHeight = <
  T extends HTMLElement = HTMLElement
>(): IUseElementHeightReturn<T> => {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) setHeight(ref.current.offsetHeight);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return { ref, height };
};
