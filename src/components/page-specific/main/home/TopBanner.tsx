"use client";

import { GridBanner } from "@/components/shared";
import { TopBannerIntro } from "./TopBannerIntro";

/**
 * Grid configuration for the banner section.
 * Each object represents a single grid block with Tailwind classes for responsive layout and animation.
 */
const gridBlocks = [
  {
    src: "/home-banner/left.webp",
  },
  {
    src: "/home-banner/top-left.webp",
  },
  {
    src: "/home-banner/top-right.webp",
  },
  {
    src: "/home-banner/bottom.webp",
  },
  {
    src: "/home-banner/right.webp",
  },
];

/**
 * TopBanner Component
 * -------------------
 * Combines the introduction text (TopBannerIntro) with
 * the animated grid of images (GridBanner).
 */
export const TopBanner = () => {
  return (
    <section className="my-16">
      {/* Intro heading, description, and CTA */}
      <TopBannerIntro />

      {/* Grid of animated banner images */}
      <GridBanner images={gridBlocks} />
    </section>
  );
};
