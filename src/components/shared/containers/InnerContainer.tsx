"use client";

import { ReactNode } from "react";

const InnerContainer = ({
  children,
  paddingSide = "both",
  className = "",
}: {
  children: ReactNode;
  paddingSide?: "left" | "right" | "both";
  className?: string;
}) => {
  return (
    <div
      className={`max-w-[120rem] w-full mx-auto ${
        paddingSide === "left"
          ? "pl-[1rem] md:pl-[1.7rem] 2xl:pl-[3rem]"
          : paddingSide === "right"
          ? "pr-[1rem] md:pr-[1.7rem] 2xl:pr-[3rem]"
          : "px-[1rem] md:px-[1.7rem] 2xl:px-[3rem]"
      }  ${className}`}
    >
      {children}
    </div>
  );
};

export default InnerContainer;
