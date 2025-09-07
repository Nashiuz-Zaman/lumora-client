"use client";

import { ButtonBtn, SlideInOutWrapperX } from "@/components/shared";
import { useRef } from "react";
import { slideInOutBtnGradient } from "./Sneakers";
import { addSubCategoriesToFilter } from "@/utils";
import { useRouter } from "next/navigation";
import { useGetRefAsState } from "@/hooks";

export const Smartphones = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const router = useRouter();

  return (
    <div
      ref={parentRef}
      className="relative h-full overflow-hidden bg-cover bg-[34%_50%]"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/diwzuhlc3/image/upload/v1757076699/lumora/intro-banner/phone-2_1_tltk4h.webp')",
      }}
    >
      <SlideInOutWrapperX
        className={`y-center ${slideInOutBtnGradient}`}
        parent={parent}
      >
        <div className="py-10 flex items-center justify-center">
          <ButtonBtn
            onClick={() => {
              addSubCategoriesToFilter(["smartphones", "mobile-accessories"]);

              router.push("/products/search");
            }}
            className="whiteOutlinedClasses"
          >
            Latest Smartphones
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};
