"use client";

import { CustomMarquee } from "@/components/shared";
import Image from "next/image";

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
        width={500}
        height={500}
        className="object-contain w-full h-full"
      />
    </div>
  );
};

export const BrandsMarquee = () => {
  return (
    <CustomMarquee<string>
      data={images}
      speed={25}
      gap="gap-5"
      paddingRight="pr-5"
      renderItem={renderFunc}
    />
  );
};
