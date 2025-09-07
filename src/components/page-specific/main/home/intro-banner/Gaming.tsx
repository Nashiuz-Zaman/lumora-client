"use client";

import { Slider, SlideInOutWrapperX, ButtonBtn } from "@/components/shared";
import { useRef } from "react";
import { slideInOutBtnGradient } from "./Sneakers";
import { addSubCategoriesToFilter } from "@/utils";
import { useRouter } from "next/navigation";
import { useGetRefAsState } from "@/hooks";

const data = [
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757072839/lumora/intro-banner/gaming-2_sc88ot.webp",
    buttonText: "Unleash your gaming side",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757072277/lumora/intro-banner/gaming-1_cfd2zv.webp",
    buttonText: "Unleash your gaming side",
  },
  {
    src: "https://res.cloudinary.com/diwzuhlc3/image/upload/v1757074329/lumora/intro-banner/gaming-3_k2tcdv.webp",
    buttonText: "Unleash your gaming side",
  },
];

interface ICardProps {
  src: string;
  buttonText: string;
}

const Card = ({ src, buttonText }: ICardProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const parent = useGetRefAsState(parentRef);
  const router = useRouter();

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
            onClick={() => {
              addSubCategoriesToFilter([
                "gaming-consoles",
                "pc-gaming",
                "vr-headsets",
              ]);

              router.push("/products/search");
            }}
            className="whiteOutlinedClasses"
          >
            {buttonText}
          </ButtonBtn>
        </div>
      </SlideInOutWrapperX>
    </div>
  );
};

export const Gaming = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <Slider
        data={data}
        slideSwitcher={true}
        renderItem={(item, i) => {
          return (
            <Card
              key={`key-${i}`}
              src={item.src}
              buttonText={item.buttonText}
            />
          );
        }}
      />
    </section>
  );
};
