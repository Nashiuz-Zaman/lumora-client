"use client";

import dynamic from "next/dynamic";
import { TopBannerIntro } from "../TopBannerIntro";

import { Food } from "./Food";
import { Laptop } from "./Laptop";
import { MenFashion } from "./MenFashion";
import { BREAKPOINTS, useMediaQuery } from "@/hooks";

const Sneakers = dynamic(() => import("./Sneakers"), {
  ssr: false,
});

const gap = "gap-3";

export const IntroBannerMobile = () => {
  const isAboveMd = useMediaQuery(BREAKPOINTS.min.sm!);

  return (
    <section className={`mb-16 ${gap}`}>
      {/* Top banner */}
      <div className="flex items-center justify-center py-10 mb-3">
        <TopBannerIntro />
      </div>

      {/* Product grid */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 grid-rows-2 h-[26rem] xs:h-[35rem] ${gap}`}
      >
        <MenFashion className="row-span-2" />

        <div className={`grid row-span-2 ${gap}`}>
          <Laptop />
          <Food />
        </div>

        {isAboveMd && <Sneakers className="row-span-2" />}
      </div>
    </section>
  );
};

export default IntroBannerMobile;
