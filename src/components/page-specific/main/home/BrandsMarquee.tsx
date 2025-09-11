"use client";

import { CustomMarquee } from "@/components/shared";
import Image from "next/image";

const renderFunc = ({ data, index }: { data: string; index: number }) => {
  return (
    <div
      key={index}
      className="relative aspect-square w-[10rem]"
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

export const BrandsMarquee = ({ logos }: { logos: string[] }) => {
  return (
    <CustomMarquee<string>
      data={logos}
      speed={25}
      gap="gap-20"
      paddingRight="pr-5"
      renderItem={renderFunc}
    />
  );
};
