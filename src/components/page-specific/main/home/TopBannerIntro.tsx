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

        .to("#shop-more-part", {
          y: 0,
          opacity: 1,
        })
        .to("#period-part", {
          opacity: 1,
          ease: "power2.out",
          duration: "0.3",
        });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`w-full select-none text-center px-[1rem] sm:px-[1.5rem] 2md:px-[2rem] 2lg:px-[3rem] py-2 ${className}`}
    >
      {/* Headline */}
      <h1 className="text-4xl 2xl:text-5xl font-semibold capitalize !leading-[1] mb-2 xl:mb-4">
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
      <p className="text-lg px-4 lg:px-0 lg:w-[85%] lg:mx-auto text-neutral-500 text-center mb-4 xl:mb-6">
        From tech gadgets to gourmet food, fashion to home essentials — discover
        everything you need in one place.
      </p>

      <LinkBtn
        href="#all-product-categories"
        className="mx-auto blackOutlinedToPrimaryClasses !rounded-full"
      >
        <CartIcon className="text-2xl" /> Start Shopping
      </LinkBtn>
    </section>
  );
};
