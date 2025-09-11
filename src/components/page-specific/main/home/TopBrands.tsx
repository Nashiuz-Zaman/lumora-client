"use client";

import dynamic from "next/dynamic";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/useMediaQuery";
import {
  InnerContainer,
  SectionHeading,
  SectionTagline,
} from "@/components/shared";

const topBrandLogos: string[] = [
  "/logos/brand-logos/apple.png",
  "/logos/brand-logos/adidas.png",
  "/logos/brand-logos/campbell.png",
  "/logos/brand-logos/hp.png",
  "/logos/brand-logos/levis.png",
  "/logos/brand-logos/michaelkors.png",
  "/logos/brand-logos/nike.png",
  "/logos/brand-logos/prada.png",
  "/logos/brand-logos/rayban.png",
  "/logos/brand-logos/samsung.png",
  "/logos/brand-logos/dior.png",
  "/logos/brand-logos/starbucks.png",
];

// Dynamic imports
const BrandsFlex = dynamic(
  () => import("./BrandsFlex").then((mod) => mod.BrandsFlex),
  {
    ssr: true,
  }
);
const BrandsMarquee = dynamic(
  () => import("./BrandsMarquee").then((mod) => mod.BrandsMarquee),
  {
    ssr: false,
  }
);

export const TopBrands = () => {
  const isMdUp = useMediaQuery(BREAKPOINTS.min.md!);

  return (
    <section className="my-10">
      <InnerContainer className="mb-8 md:mb-12 lg:mb-16 text-center">
        <SectionHeading className="mb-4">Top Brands</SectionHeading>

        <SectionTagline>
          We sell products from over <span className="font-semibold">100+</span>
          brands
        </SectionTagline>
      </InnerContainer>

      {isMdUp ? (
        <InnerContainer>
          <BrandsFlex logos={topBrandLogos} />
        </InnerContainer>
      ) : (
        <BrandsMarquee logos={topBrandLogos} />
      )}
    </section>
  );
};
