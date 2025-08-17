"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const STORAGE_KEY = "backRouteUrl";

export const useBackRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams?.toString();
  const currentUrlRef = useRef<string>("");
  const [backRouteUrl, setBackRouteUrl] = useState<string | null>(null);

  const getCurrentFullUrl = useCallback((): string => {
    return searchParamsStr ? `${pathname}?${searchParamsStr}` : pathname;
  }, [pathname, searchParamsStr]);

  // Load stored URL from localStorage on first render
  useEffect(() => {
    if (backRouteUrl === null) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBackRouteUrl(stored);
    }
  }, [backRouteUrl]);

  // Track current URL and update localStorage
  useEffect(() => {
    const currentUrl = getCurrentFullUrl();

    if (currentUrlRef.current && currentUrlRef.current !== currentUrl) {
      localStorage.setItem(STORAGE_KEY, currentUrlRef.current);
      setBackRouteUrl(currentUrlRef.current);
    }

    currentUrlRef.current = currentUrl;
  }, [pathname, getCurrentFullUrl]);

  // Navigate to stored back route
  const goBack = (): void => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) router.push(stored);
  };

  // Manually set the back route URL
  const setBackRouteManually = (url: string): void => {
    localStorage.setItem(STORAGE_KEY, url);
    setBackRouteUrl(url);
  };

  return {
    backRouteUrl,
    goBack,
    setBackRouteManually,
  };
};
