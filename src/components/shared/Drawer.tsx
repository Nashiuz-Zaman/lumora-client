"use client";

import { ReactNode } from "react";

interface IDrawerProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  direction?: "left" | "right";
  animationDuration?: number;
  attachedToViewPort?: boolean;
  zIndex?: number;
}

const Drawer = ({
  children,
  className = "",
  show = true,
  direction = "left",
  animationDuration = 0,
  attachedToViewPort = true,
  zIndex = 100,
}: IDrawerProps) => {
  const zIndexClass = `z-[${zIndex}]`;

  return (
    <div
      style={{ transitionDuration: `${animationDuration}ms` }}
      className={`${zIndexClass} ${
        attachedToViewPort ? "fixed" : "absolute"
      } top-0 transition-all ${
        direction === "left"
          ? `left-0 ${show ? "translate-x-0" : "-translate-x-full"}`
          : `right-0 ${show ? "translate-x-0" : "translate-x-full"}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Drawer;
