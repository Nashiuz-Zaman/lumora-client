"use client";

import {
  ButtonBtn,
  DesignerVideo,
  SlideInOutWrapperX,
} from "@/components/shared";
import { useGetRefAsState } from "@/hooks";
import { addSubCategoriesToFilter } from "@/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// export this gradietn to apply on
export const slideInOutBtnGradient =
  "bg-gradient-to-br backdrop-blur-[3px] from-primary-dark/70 to-primary-dark/40";

export const Sneakers = ({ className }: { className?: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const router = useRouter();

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
            onClick={() => {
              addSubCategoriesToFilter(["sneakers"]);

              router.push("/products/search");
            }}
            className="whiteOutlinedClasses"
          >
            Explore Sneakers
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};

export default Sneakers;
