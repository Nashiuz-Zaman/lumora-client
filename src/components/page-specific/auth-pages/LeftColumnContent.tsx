"use client";

import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { GridCard, TGridCardImage } from "@/components/shared";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
gsap.registerPlugin(useGSAP);

interface ILeftColumnProps {
  heading?: string;
  subtitle?: JSX.Element | string;
  images: TGridCardImage[];
  className?: string;
}

export const LeftColumnContent = ({
  heading = "LUMORA",
  subtitle = "A modern, clean e-commerce shop for top brands",
  images,
  className = "",
}: ILeftColumnProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1 }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1 },
        ">0.2" // slight overlap after heading
      );
    }

    if (gridRef.current) {
      tl.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1 },
        ">0.3" // after subtitle
      );
    }
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 text-white select-none ${className}`}
    >
      <Link href="/">
        <h1
          ref={headingRef}
          className="text-5xl md:text-6xl font-extrabold tracking-widest text-center"
        >
          {heading}
        </h1>
      </Link>
      <p
        ref={subtitleRef}
        className="text-lg md:text-xl text-center max-w-md opacity-90 text-neutral-100"
      >
        {subtitle}
      </p>

      <div ref={gridRef} className="w-full max-w-md">
        <GridCard images={images} />
      </div>
    </div>
  );
};
