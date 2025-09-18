"use client";

import { ButtonBtn, SlideInOutWrapperX } from "@/components/shared";
import { useRef } from "react";
import { slideInOutBtnGradient } from "./Sneakers";
import { setCategoryFilter } from "@/utils";
import { useRouter } from "next/navigation";
import { useGetRefAsState } from "@/hooks";

export const Food = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const router = useRouter();

  return (
    <div
      ref={parentRef}
      className="relative h-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/diwzuhlc3/image/upload/v1757097444/lumora/intro-banner/ar-taste-test-potato-chips-hero-4x3-4f7116c88fd84827ac9e633385fd771d_1_erdq0y.webp')",
      }}
    >
      <SlideInOutWrapperX
        className={`y-center ${slideInOutBtnGradient}`}
        parent={parent}
      >
        <div className="py-10 flex items-center justify-center">
          <ButtonBtn
            onClick={() => {
              setCategoryFilter({
                type: "subs",
                subSlugs: [
                  "chips-snacks",
                  "chocolates-candy",
                  "instant-meals",
                  "organic-food",
                ],
              });

              router.push("/products/search");
            }}
            className="whiteOutlinedClasses"
          >
            Shop Frozen Food & More
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};
