import { useRef, useCallback, useEffect } from "react";

/**
 * Returns a debounced version of a callback.
 * The callback will only execute after `delay` ms of no new calls.
 */
export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return debouncedFn;
};
