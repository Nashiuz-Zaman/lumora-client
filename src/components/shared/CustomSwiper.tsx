"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

type TBreakpointsType = {
  [key: number]: { slidesPerView: number };
};

export type TCustomSwiperProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showNavigation?: boolean;
  navigation?: {
    nextEl: string;
    prevEl: string;
  };
  breakpoints?: TBreakpointsType | null;
  autoplay?: boolean;
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
  innerContainerClassName?: string;
} & Record<string, unknown>;

const defaultBreakpoints: TBreakpointsType = {
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
  1700: { slidesPerView: 5 },
};

export const CustomSwiper = <T,>({
  data = [],
  renderItem,
  showNavigation = false,
  navigation = {
    nextEl: ".custom-swiper-next",
    prevEl: ".custom-swiper-prev",
  },
  breakpoints = null,
  autoplay = false,
  spaceBetween = 25,
  loop = false,
  className = "",
  innerContainerClassName = "",
  ...props
}: TCustomSwiperProps<T>) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperRef.current && autoplay && data.length > 0) {
      swiperRef.current.autoplay?.start?.();
    }
  }, [data, autoplay]);

  if (!data.length) return null;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div
        className={`w-full h-full py-6 overflow-hidden ${innerContainerClassName}`}
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="[&_.swiper-wrapper]:!h-full !overflow-visible"
          modules={[Autoplay, Navigation, A11y]}
          loop={loop}
          autoplay={autoplay}
          spaceBetween={spaceBetween}
          {...(showNavigation ? { navigation } : {})}
          breakpoints={
            breakpoints
              ? { ...defaultBreakpoints, ...breakpoints }
              : defaultBreakpoints
          }
          {...props}
        >
          {data.map((item, i) => (
            <SwiperSlide className="!h-auto" key={`key-${i}`}>
              {renderItem(item, i)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
