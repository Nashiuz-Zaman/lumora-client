"use client";

import { useEffect, useState, ReactNode } from "react";

type AccordionVerticalProps = {
  children: ReactNode;
  expanded?: boolean;
  modifyClasses?: string;
  animate?: boolean;
  duration?: string;
  previewHeight?: number | string | null;
};

const AccordionVertical = ({
  children,
  expanded = false,
  modifyClasses = "",
  animate = false,
  duration = "150ms",
  previewHeight = null,
}: AccordionVerticalProps) => {
  const transitionDurationClass = `duration-[${duration}]`;
  const [overflow, setOverflow] = useState("overflow-hidden");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (expanded) {
      timer = setTimeout(() => {
        setOverflow("overflow-visible");
      }, parseInt(duration));
    } else {
      setOverflow("overflow-hidden");
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [expanded, duration]);

  return (
    <div className={modifyClasses}>
      <div
        style={{
          ...(previewHeight
            ? expanded
              ? { maxHeight: "200rem" }
              : { maxHeight: previewHeight, overflow: "hidden" }
            : expanded
            ? { gridTemplateRows: "1fr" }
            : { gridTemplateRows: "0fr" }),
        }}
        className={`grid grid-cols-1 ${
          animate ? `transition-all ${transitionDurationClass}` : ""
        }`}
      >
        <div className={`${overflow} transition-all !duration-0 no-scrollbar`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionVertical;
