"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const useCurrentUrlPath = (): {
  pathname: string;
  fullUrl: string;
  queryStr: string;
} => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryStr = searchParams.toString();
  const fullUrl = queryStr ? `${pathname}?${queryStr}` : pathname;

  return { pathname, fullUrl, queryStr };
};
