"use client";

import { LinkBtn } from "@/components/shared/buttons";
import { InnerContainer } from "@/components/shared/containers";

const TopBannerIntro = ({ className = "" }: { className?: string }) => {
  return (
    <InnerContainer>
      <section
        className={`w-full select-none text-center px-[1rem] sm:px-[1.5rem] 2md:px-[2rem] 2lg:px-[3rem] mb-8 sm:mb-10 2md:mb-18 ${className}`}
      >
        {/* Headline */}
        <h1 className="text-[2.25rem] xs:text-3xl sm:text-4xl 2md:text-5xl 2lg:text-6xl 3xl:text-7xl font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-orange-300 bg-clip-text text-transparent capitalize leading-tight mx-auto mb-4 max-w-[20rem] xs:max-w-[28rem] sm:max-w-[32rem] 2md:max-w-[40rem] 2lg:max-w-[60rem] 3xl:max-w-[80rem]">
          Welcome to Lumora
        </h1>

        {/* Subtitle */}
        <p className="text-sm xs:text-base sm:text-lg 2md:text-xl text-neutral-600 max-w-[20rem] xs:max-w-[28rem] sm:max-w-[32rem] 2md:max-w-[40rem] 2lg:max-w-[60rem] 3xl:max-w-[70rem] mx-auto mb-6 sm:mb-8 2md:mb-10">
          From tech gadgets to gourmet food, fashion to home essentials —
          discover everything you need in one place.
        </p>

        {/* Call to Action Button */}
        <LinkBtn
          href="#top-deals"
          modifyClasses="mx-auto !primaryClasses !rounded-full "
        >
          Start Shopping
        </LinkBtn>
      </section>
    </InnerContainer>
  );
};

export default TopBannerIntro;
