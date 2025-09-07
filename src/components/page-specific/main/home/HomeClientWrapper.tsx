"use client";

import dynamic from "next/dynamic";
import { DataLoadingSpinner } from "@/components/shared";
import { useDelay } from "@/hooks";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/useMediaQuery";

//  Dynamically import desktop & mobile banners
const IntroBanner = dynamic(() => import("./intro-banner/IntroBanner"), {
  ssr: false,
});
const IntroBannerMobile = dynamic(
  () => import("./intro-banner/IntroBannerMobile"),
  {
    ssr: false,
  }
);

export const HomeClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isReady = useDelay(1100);
  const isAboveLg = useMediaQuery(BREAKPOINTS.min.lg!);

  if (!isReady) {
    return (
      <div className="h-[100vh] flex items-center justify-center relative">
        <DataLoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isAboveLg ? <IntroBanner /> : <IntroBannerMobile />}
      {children}
    </>
  );
};
