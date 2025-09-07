"use client";

import { useEffect, useState } from "react";

export const useDelay = (ms: number) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return ready;
};
