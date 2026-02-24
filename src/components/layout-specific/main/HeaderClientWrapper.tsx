"use client";

import { useHeaderScrollAnim } from "@/hooks/useHeaderScrollAnim";

const HeaderClientWrapper = ({ header }: { header: React.ReactNode }) => {
  useHeaderScrollAnim();

  return <>{header}</>;
};

export default HeaderClientWrapper;
