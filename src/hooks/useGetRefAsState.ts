"use client";

import { RefObject, useEffect, useState } from "react";

export const useGetRefAsState = <T>(ref: RefObject<T | null>) => {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    setResult(ref.current);
  }, [ref]);

  return result
};
