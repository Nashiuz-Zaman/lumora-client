"use client";

import { useRef } from "react";
import gsap from "gsap";
import { CartIcon, LinkBtn } from "@/components/shared";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export const TopBannerIntro = ({ className = "" }: { className?: string }) => {
  const container = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: { duration: 0.6, ease: "bounce.out" },
      });

      timeline
        .to("#worry-less-part", { opacity: 1, x: 0 })
        .to("#shop-more-part", { y: 0, opacity: 1 })
        .to("#period-part", {
          opacity: 1,
          ease: "power2.out",
          duration: 0.3,
        });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`w-full select-none text-center lg:text-left ${className}`}
    >
      {/* Headline */}
      <h1 className="text-4xl 2xl:text-6xl font-semibold capitalize !leading-[1] mb-2 xl:mb-4 text-center lg:text-left">
        <span
          className="opacity-0 inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent translate-y-[-200px]"
          id="shop-more-part"
        >
          Shop More
        </span>
        <span className="opacity-0 text-secondary" id="period-part">
          .
        </span>
        <span
          id="worry-less-part"
          className="translate-x-[200px] opacity-0 inline-block"
        >
          Worry Less
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-neutral-400 mb-4 xl:mb-6 sm:w-[60%] sm:mx-auto text-center lg:w-full lg:mx-0 lg:text-left">
        From tech gadgets to gourmet food, fashion to home essentials — discover
        everything you need in one place.
      </p>

      <LinkBtn
        href="#all-product-categories"
        className="primaryClasses !rounded-full mx-auto lg:mx-0"
      >
        <CartIcon className="text-2xl" /> Start Shopping
      </LinkBtn>
    </section>
  );
};
