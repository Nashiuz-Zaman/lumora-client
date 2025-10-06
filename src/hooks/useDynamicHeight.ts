"use client";

import { RefObject, useEffect, useState } from "react";
import { useResizeObserver, useScreenSize } from "./";
import { getHeight } from "@/utils";

interface IUseDynamicHeightOptions {
  refElements?: (RefObject<HTMLElement> | null)[];
  fixedHeights?: number[];
}

export const useDynamicHeight = ({
  refElements = [],
  fixedHeights = [],
}: IUseDynamicHeightOptions) => {
  const { height: screenHeight } = useScreenSize();
  const [dynamicHeight, setDynamicHeight] = useState<number | null>(null);
  const entries = useResizeObserver(refElements);

  useEffect(() => {
    if (!screenHeight || entries.includes(null)) return;

    const refsHeight = entries
      .filter((entry): entry is ResizeObserverEntry => entry !== null)
      .reduce((sum, entry) => sum + getHeight(entry), 0);

    const fixed = fixedHeights.reduce((sum, h) => sum + h, 0);

    setDynamicHeight(screenHeight - refsHeight - fixed);
  }, [screenHeight, fixedHeights, entries]);

  return dynamicHeight;
};
