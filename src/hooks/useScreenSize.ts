"use client";
import { useEffect, useState } from "react";

interface IScreenSize {
  width: number | null;
  height: number | null;
}

export const useScreenSize = (): IScreenSize => {
  // Start with nulls to avoid hydration mismatch
  const [size, setSize] = useState<IScreenSize>({
    width: null,
    height: null,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize(); // run once on mount
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
