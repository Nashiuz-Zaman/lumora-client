"use client";

import { TopBannerIntro } from "../TopBannerIntro";
import WomenFashion from "./WomenFashion";
import { MenFashion } from "./MenFashion";
import { Food } from "./Food";
import { Laptop } from "./Laptop";
import { Gaming } from "./Gaming";
import { Smartphones } from "./Smartphones";
import Sneakers from "./Sneakers";

const gap = "gap-3";

export const IntroBanner = () => {
  return (
    <section
      className={`grid grid-cols-[1.15fr_2.75fr_1.15fr] h-[50rem] xl:h-[90vh] mb-16 ${gap}`}
    >
      <Sneakers />

      {/* Middle section */}
      <div className="grid grid-rows-3">
        <div className="flex items-center row-span-1">
          <TopBannerIntro />
        </div>

        <div
          className={`grid grid-cols-[0.7fr_0.7fr_1fr] grid-rows-2 row-span-2 ${gap}`}
        >
          {/* Mobile phones */}
          <Smartphones />

          {/* Washing machines */} 
          <Food />

          {/* Man in a suit */}
          <MenFashion className="row-span-2 col-span-1" />

          {/* Xbox & PlayStation */}
          <Gaming className="col-span-2" />
        </div>
      </div>

      {/* Right side */}
      <div className={`h-full flex flex-col ${gap}`}>
        <WomenFashion />
        <Laptop className="grow" />
      </div>
    </section>
  );
};

export default IntroBanner;
