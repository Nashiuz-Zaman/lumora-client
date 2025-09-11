"use client";

import Image from "next/image";

export const BrandsFlex = ({ logos }: { logos: string[] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-10 xl:gap-x-20">
      {logos?.map((logo, i) => (
        <div
          key={i}
          className="aspect-square w-[8rem] xl:w-[9rem]"
        >
          <Image
            src={logo}
            alt={`Top brands we sell photo-${i}`}
            width={500}
            height={500}
            className="object-contain w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
