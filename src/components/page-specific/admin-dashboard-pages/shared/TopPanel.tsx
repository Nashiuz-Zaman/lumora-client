"use client";

import { ReactNode, useEffect, useRef } from "react";
import { InnerContainer } from "@/components/shared";
import { useRefState } from "@/hooks";

interface ITopPanelProps {
  /** Buttons / actions to show on the right */
  actions?: ReactNode;
}

export const TopPanel = ({ actions }: ITopPanelProps) => {
  const titleRef = useRef(null);
  const { setRefs } = useRefState();

  useEffect(() => {
    setRefs((prev) => ({ ...prev, titleRef }));

    return () => {
      setRefs((prev) => ({ ...prev, titleRef: null }));
    };
  }, [setRefs]);

  return (
    <div className="bg-white border-b h-18 border-neutral-200 flex items-center shrink-0">
      <InnerContainer className="flex items-center h-full justify-between gap-4">
        {/* Left side: Title */}
        <h2 ref={titleRef} className="text-lg font-semibold"></h2>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3">{actions}</div>
      </InnerContainer>
    </div>
  );
};
