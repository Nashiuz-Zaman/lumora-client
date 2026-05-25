"use client";

import { useHeaderScrollAnimation } from "@/hooks/useHeaderScrollAnimation";

const HeaderClientWrapper = ({ header }: { header: React.ReactNode }) => {
  useHeaderScrollAnimation();

  return <>{header}</>;
};

export default HeaderClientWrapper;
