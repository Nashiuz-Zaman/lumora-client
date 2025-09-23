"use client";

import { ReactNode } from "react";

interface IAccordionHorizontalProps {
  children: ReactNode;
  expanded?: boolean;
  className?: string;
  animate?: boolean;
  duration?: string;
}

export const AccordionHorizontal = ({
  children,
  expanded = false,
  className = "",
  animate = false,
  duration = "150ms",
}: IAccordionHorizontalProps) => {
  const transitionDurationClass = `duration-[${duration}]`;

  return (
    <div {...(className ? { className } : {})}>
      <div
        className={`grid grid-rows-1 ${
          expanded ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
        } ${animate ? `transition-all ${transitionDurationClass}` : ""}`}
      >
        <div
          style={{
            maxWidth: expanded ? "5000px" : "0px",
            overflowX: expanded ? "visible" : "hidden",
          }}
          className={`transition-all ${transitionDurationClass}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
