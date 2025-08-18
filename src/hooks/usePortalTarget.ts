import { useState, useCallback } from "react";

export function usePortalTarget<T extends HTMLElement>() {
  const [target, setTarget] = useState<T | null>(null);

  const ref = useCallback((node: T | null) => {
    if (node) setTarget(node);
  }, []);

  return { target, ref };
}
