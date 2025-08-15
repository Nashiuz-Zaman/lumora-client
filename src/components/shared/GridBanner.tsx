"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CenterContainer } from "./containers/CenterContainer";

gsap.registerPlugin(useGSAP);

const GridBanner = ({
  images,
  className = "",
}: {
  images: { src: string; extraClasses?: string }[];
  className?: string;
}) => {
  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 1, ease: "power3.out" },
    });

    tl.to(".banner-grid-block", { x: 0, y: 0, opacity: 1, stagger: 0.2 });
    tl.play();
  }, []);

  const blocks = Array.from({ length: 5 }).map(
    (_, idx) => images[idx] || { src: "", extraClasses: "" }
  );

  return (
    <CenterContainer>
      <div
        className={`grid grid-cols-2 sm:grid-cols-5 grid-rows-4 gap-2 sm:gap-3 2md:gap-4 h-[25rem] sm:h-[15rem] 2md:h-[35rem] ${className}`}
      >
        {/* Block 1 - Left */}
        <div
          className={`banner-grid-block opacity-0 rounded-xl bg-cover bg-center col-span-1 row-span-2 sm:row-span-4 -translate-x-[300%] ${
            blocks[0].extraClasses || ""
          }`}
          style={{ backgroundImage: `url('${blocks[0].src}')` }}
        />
        {/* Block 2 - Top Left */}
        <div
          className={`banner-grid-block opacity-0 rounded-xl bg-cover bg-center col-span-1 row-span-1 sm:row-span-2 -translate-y-[100px] ${
            blocks[1].extraClasses || ""
          }`}
          style={{ backgroundImage: `url('${blocks[1].src}')` }}
        />
        {/* Block 3 - Top Right */}
        <div
          className={`banner-grid-block opacity-0 rounded-xl bg-cover bg-center col-span-1 col-start-2 sm:col-start-3 row-span-1 row-start-2 sm:row-start-1 sm:row-span-2 -translate-y-[100px] ${
            blocks[2].extraClasses || ""
          }`}
          style={{ backgroundImage: `url('${blocks[2].src}')` }}
        />
        {/* Block 4 - Bottom */}
        <div
          className={`banner-grid-block opacity-0 rounded-xl bg-cover bg-center col-span-1 col-start-1 sm:col-start-2 sm:col-span-2 row-span-2 translate-y-[100px] ${
            blocks[3].extraClasses || ""
          }`}
          style={{ backgroundImage: `url('${blocks[3].src}')` }}
        />
        {/* Block 5 - Right */}
        <div
          className={`banner-grid-block opacity-0 rounded-xl bg-cover col-start-2 col-span-1 sm:col-start-4 sm:col-span-2 row-start-3 row-span-2 sm:row-start-1 sm:row-span-4 translate-x-[100px] bg-[80%_50%] ${
            blocks[4].extraClasses || ""
          }`}
          style={{ backgroundImage: `url('${blocks[4].src}')` }}
        />
      </div>
    </CenterContainer>
  );
};

export default GridBanner;
