"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

interface IUseActiveLinkReturn {
  checkIfActive: (url: string, substringCheck?: boolean) => boolean;
}

export const useActiveLink = (): IUseActiveLinkReturn => {
  const pathname = usePathname();

  const checkIfActive = useCallback(
    (url: string, substringCheck = false): boolean => {
      if (substringCheck) {
        return pathname === url || pathname.includes(url);
      }
      return pathname === url;
    },
    [pathname]
  );

  return { checkIfActive };
};
