import { useRef, useCallback, useEffect } from "react";

export const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<typeof callback>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => cancel, [cancel]);

  return [debouncedFn, cancel] as const;
};
