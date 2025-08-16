"use client";

import { ReactNode } from "react";

type AccordionHorizontalProps = {
  children: ReactNode;
  expanded?: boolean;
  modifyClasses?: string;
  animate?: boolean;
  duration?: string;
};

export const AccordionHorizontal = ({
  children,
  expanded = false,
  modifyClasses = "",
  animate = false,
  duration = "150ms",
}: AccordionHorizontalProps) => {
  const transitionDurationClass = `duration-[${duration}]`;

  return (
    <div className={modifyClasses}>
      <div
        className={`grid grid-rows-1 ${
          expanded ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
        } ${animate ? `transition-all ${transitionDurationClass}` : ""}`}
      >
        <div className="overflow-hidden transition-all !duration-0">
          {children}
        </div>
      </div>
    </div>
  );
};


