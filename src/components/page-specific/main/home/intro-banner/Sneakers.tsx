"use client";

import {
  ButtonBtn,
  DesignerVideo,
  SlideInOutWrapperX,
} from "@/components/shared";
import { useGetRefAsState, useProductSearchParamsManagement } from "@/hooks";
import { useRef } from "react";

// export this gradient to apply on
export const slideInOutBtnGradient = "bg-white/30 backdrop-blur-[3px]";
export const btnClasses = "primaryLightClasses underline underline-offset-3 !rounded-full";

export const Sneakers = ({ className }: { className?: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <div ref={parentRef} className={`relative overflow-hidden ${className}`}>
      <DesignerVideo
        className="h-full"
        src="https://res.cloudinary.com/diwzuhlc3/video/upload/v1756840545/lumora/videos/_ebabeb71-4e53-4872-abc1-b304f87c1c76_dothfh.mp4"
      />

      <SlideInOutWrapperX
        className={`y-center ${slideInOutBtnGradient}`}
        parent={parent}
      >
        <div className="py-10 flex items-center justify-center">
          <ButtonBtn
            onClick={() =>
              handleCategoryClick({
                type: "subs",
                subSlugs: ["sneakers"],
              })
            }
            className={btnClasses}
          >
            Explore Sneakers
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};

export default Sneakers;
