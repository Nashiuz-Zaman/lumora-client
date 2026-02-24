"use client";

import Image from "next/image";
import { Slider } from "@/components/shared";
import { TopBannerIntro } from "../TopBannerIntro";
import { Suspense } from "react";

const sliderImages = [
  "https://res.cloudinary.com/diwzuhlc3/image/upload/v1764184789/lumora/intro-banner/home-2_rguud2.webp",
  "https://res.cloudinary.com/dngidsew4/image/upload/v1764550428/adidas-ad_gywhds.webp",
  "https://res.cloudinary.com/diwzuhlc3/image/upload/v1764184788/lumora/intro-banner/home-1_ptqptr.webp",
  "https://res.cloudinary.com/diwzuhlc3/image/upload/v1764183134/lumora/intro-banner/home-4_xnexof.webp",
  "https://res.cloudinary.com/diwzuhlc3/image/upload/v1764233369/lumora/intro-banner/home-4_mgwyo5.webp",
];

export const IntroBanner = () => {
  return (
    <section className="w-full lg:h-120 xl:h-168 grid grid-cols-1 lg:grid-cols-[1.5fr_4fr] gap-2">
      {/* Original top banner intro */}
      <div className="lg:h-full py-10 md:py-12 lg:py-0 grid place-content-center px-5 xl:px-5 2xl:px-14">
        <TopBannerIntro />
      </div>

      <Suspense>
        <Slider
          data={sliderImages}
          slideSwitcher={true}
          autoPlayInterval={4000}
          renderItem={(src: string) => (
            <div className="w-full h-88 overflow-hidden lg:h-full">
              <Image
                src={src}
                alt="Slide"
                width={1500}
                height={680}
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        />
      </Suspense>
    </section>
  );
};

export default IntroBanner;
