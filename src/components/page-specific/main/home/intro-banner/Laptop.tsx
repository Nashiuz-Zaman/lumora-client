"use client";

import { ButtonBtn, SlideInOutWrapperX } from "@/components/shared";
import { slideInOutBtnGradient } from "./Sneakers";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useGetRefAsState } from "@/hooks/useGetRefAsState";
import { setCategoryFilter } from "@/utils";

export const Laptop = ({ className }: { className?: string }) => {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const parent = useGetRefAsState(parentRef);

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
              onClick={() => {
                setCategoryFilter({
                  type: "subs",
                  subSlugs: ["gaming-laptops"],
                });

                router.push("/products/search");
              }}
              className="whiteOutlinedClasses"
            >
              Buy Laptops{" "}
            </ButtonBtn>
          </div>
        </SlideInOutWrapperX>
      )}
    </div>
  );
};
