"use client";

import { SlideInOutWrapperX, ButtonBtn, FadeSlider } from "@/components/shared";
import { useRef } from "react";
import { btnClasses, slideInOutBtnGradient } from "./Sneakers";
import { useGetRefAsState, useProductSearchParamsManagement } from "@/hooks";

const data = [
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1759517595/lumora/intro-banner/woman-1-1_1_sxg6yr.webp",
    buttonText: "Women's Fashion & Accessories",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1759059201/lumora/intro-banner/woman-2_2_or7mly.webp",
    buttonText: "Women's Fashion & Accessories",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1759510761/lumora/intro-banner/wedding_1_r2agls.webp",
    buttonText: "Women's Fashion & Accessories",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1759009109/lumora/intro-banner/woman-3_kwuyxe.webp",
    buttonText: "Women's Fashion & Accessories",
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
                  "womens-clothing",
                  "shoes",
                  "boots",
                  "bags-wallets",
                  "jewelry",
                  "sunglasses",
                  "watches",
                ],
              })
            }
            className={btnClasses}
          >
            {buttonText}
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};

export const WomenFashion = ({ className }: { className?: string }) => {
  return (
    <section className={`relative h-[66%] overflow-hidden ${className}`}>
      <FadeSlider
        autoPlayInterval={3400}
        data={data}
        slideSwitcher={true}
        renderItem={(item, i) => (
          <Card key={`key-${i}`} src={item.src} buttonText={item.buttonText} />
        )}
      />
    </section>
  );
};
