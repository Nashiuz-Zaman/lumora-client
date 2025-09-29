import { useEffect } from "react";

export const useSetElementText = (
  element: HTMLElement | null | undefined,
  text: string
) => {
  useEffect(() => {
    if (!element) return;

    const prev = element.textContent;
    element.textContent = text;

    return () => {
      element.textContent = prev ?? "";
    };
  }, [element, text]);
};
