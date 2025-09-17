import { ReactNode } from "react";

export const InnerContainer = ({
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
          ? "pl-[1rem] md:pl-[1.7rem] 2xl:pl-8 3xl:pl-9"
          : paddingSide === "right"
          ? "pr-[1rem] md:pr-[1.7rem] 2xl:pr-8 3xl:pr-9"
          : "px-[1rem] md:px-[1.7rem] 2xl:px-8 3xl:px-9"
      }  ${className}`}
    >
      {children}
    </div>
  );
};
