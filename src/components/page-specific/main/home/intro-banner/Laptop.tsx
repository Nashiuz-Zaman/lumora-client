"use client";

import { ButtonBtn, SlideInOutWrapperX } from "@/components/shared";
import { btnClasses, slideInOutBtnGradient } from "./Sneakers";
import { useRef } from "react";
import { useGetRefAsState, useProductSearchParamsManagement } from "@/hooks";

export const Laptop = ({ className }: { className?: string }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const parent = useGetRefAsState(parentRef);
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <div
      ref={parentRef}
      className={`relative bg-cover bg-[60%] ${className}`}
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/diwzuhlc3/image/upload/v1757097214/lumora/intro-banner/20250906_0031_image_q6kxt3.webp')",
      }}
    >
      {parent && (
        <SlideInOutWrapperX
          parent={parent}
          className={`y-center ${slideInOutBtnGradient}`}
        >
          <div className="py-10 flex items-center justify-center">
            <ButtonBtn
              onClick={() =>
                handleCategoryClick({
                  type: "subs",
                  subSlugs: ["gaming-laptops"],
                })
              }
              className={btnClasses}
            >
              Buy Laptops
            </ButtonBtn>
          </div>
        </SlideInOutWrapperX>
      )}
    </div>
  );
};
