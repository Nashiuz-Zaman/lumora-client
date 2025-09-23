"use client";

import { ButtonBtn, SlideInOutWrapperX } from "@/components/shared";
import { useRef } from "react";
import { btnClasses, slideInOutBtnGradient } from "./Sneakers";
import { useGetRefAsState, useProductSearchParamsManagement } from "@/hooks";

export const Smartphones = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const { handleCategoryClick } = useProductSearchParamsManagement();

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
            onClick={() =>
              handleCategoryClick({
                type: "subs",
                subSlugs: ["smartphones", "mobile-accessories"],
              })
            }
            className={btnClasses}
          >
            Latest Smartphones
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};
