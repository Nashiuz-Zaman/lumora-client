"use client";

import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { GridCard, IGridCardImage } from "@/components/shared";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
gsap.registerPlugin(useGSAP);

interface ILeftColumnProps {
  heading?: string;
  subtitle?: JSX.Element | string;
  images: IGridCardImage[];
  className?: string;
}

export const LeftColumnContent = ({
  heading = "LUMORA",
  subtitle = "A modern, clean e-commerce shop for top brands",
  images,
  className = "",
}: ILeftColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
      });

      tl.to("#leftcol-heading", { y: 0, opacity: 1 })
        .to("#leftcol-subtitle", { y: 0, opacity: 1 }, "<0.25")
        .to("#leftcol-grid", { opacity: 1 }, "<0.25");
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center gap-8 text-neutral-50 select-none ${className}`}
    >
      <Link
        id="leftcol-heading"
        className="block translate-y-[-100px] opacity-0"
        href="/"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest text-center">
          {heading}
        </h1>
      </Link>

      <p
        id="leftcol-subtitle"
        className="translate-y-[-100px] opacity-0 text-lg md:text-xl text-center max-w-md  text-neutral-100"
      >
        {subtitle}
      </p>

      <div
        id="leftcol-grid"
        className="w-full max-w-md opacity-0"
      >
        <GridCard images={images} />
      </div>
    </div>
  );
};
