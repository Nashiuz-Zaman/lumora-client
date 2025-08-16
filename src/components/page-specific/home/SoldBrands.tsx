"use client";

// core
import Image from "next/image";

// components
import { CustomMarquee, InnerContainer } from "@/components/shared";

const images: string[] = [
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

const renderFunc = ({ data, index }: { data: string; index: number }) => {
  return (
    <div
      key={index}
      className="relative w-28 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 xl:w-56 xl:h-32"
    >
      <Image
        src={data}
        alt={`brand-${index}`}
        fill
        className="object-contain"
      />
    </div>
  );
};

export const SoldBrands = () => {
  return (
    <section className="mb-10 md:mb-16 lg:mb-24">
      <InnerContainer className="mb-8 md:mb-12 lg:mb-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
          Top Brands
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-500">
          We sell products from over <span className="font-semibold">100+</span>{" "}
          brands
        </p>
      </InnerContainer>

      <CustomMarquee<string>
        data={images}
        speed={25}
        gap="gap-5"
        paddingRight="pr-5"
        renderItem={renderFunc}
      />
    </section>
  );
};


