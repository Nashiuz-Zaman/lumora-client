"use client";

import { Slider, SlideInOutWrapperX, ButtonBtn } from "@/components/shared";
import { useRef } from "react";
import { slideInOutBtnGradient } from "./Sneakers";
import { useGetRefAsState, useProductSearchParamsManagement } from "@/hooks";

const data = [
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757094100/lumora/intro-banner/33e4d7a6de54db071d46421250ccc951_1_fkqjbb.webp",
    buttonText: "Men's Fashion",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757093918/lumora/intro-banner/05ca2ecadd39a3b9d4a07ad85c371039_1_q1q7vs.webp",
    buttonText: "Men's Fashion",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757092717/lumora/intro-banner/men-fashion-3_2_1_aeduyr.webp",
    buttonText: "Men's Fashion",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757076809/lumora/intro-banner/mens-fashion-4_xsxpcd.webp",
    buttonText: "Men's Fashion",
  },
];

interface ICardProps {
  src: string;
  buttonText: string;
}

const Card = ({ src, buttonText }: ICardProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <div
      aria-label={buttonText}
      ref={parentRef}
      className="relative bg-cover bg-center w-full h-full"
      style={{
        backgroundImage: `url("${src}")`,
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
                subSlugs: [
                  "mens-clothing",
                  "shoes",
                  "boots",
                  "bags-wallets",
                  "sunglasses",
                  "watches",
                ],
              })
            }
            className="whiteOutlinedClasses"
          >
            {buttonText}
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};

export const MenFashion = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <Slider
        data={data}
        slideSwitcher={true}
        renderItem={(item, i) => (
          <Card key={`key-${i}`} src={item.src} buttonText={item.buttonText} />
        )}
      />
    </section>
  );
};
