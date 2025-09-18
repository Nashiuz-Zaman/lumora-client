"use client";

import {
  ButtonBtn,
  DesignerVideo,
  SlideInOutWrapperX,
} from "@/components/shared";
import { useRef } from "react";
import { slideInOutBtnGradient } from "./Sneakers";
import { setCategoryFilter } from "@/utils";
import { useRouter } from "next/navigation";
import { useGetRefAsState } from "@/hooks";

export const WomenFashion = () => {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);

  return (
    <div ref={parentRef} className="relative h-[60%] overflow-hidden">
      <DesignerVideo src="https://res.cloudinary.com/diwzuhlc3/video/upload/v1756840501/lumora/videos/20250903_0112_video_ljzjmz.mp4" />

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
                  "womens-clothing",
                  "shoes",
                  "boots",
                  "bags-wallets",
                  "jewelry",
                  "sunglasses",
                  "watches",
                ],
              });

              router.push("/products/search");
            }}
            className="whiteOutlinedClasses"
          >
            Women&apos;s Fashion & Accessories
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};

export default WomenFashion;
