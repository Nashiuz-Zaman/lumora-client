"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

type BreakpointsType = {
  [key: number]: { slidesPerView: number };
};

type ICustomSwiperProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showNavigation?: boolean;
  navigation?: {
    nextEl: string;
    prevEl: string;
  };
  breakpoints?: BreakpointsType | null;
  autoplay?: boolean;
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
} & Record<string, unknown>;

const defaultBreakpoints: BreakpointsType = {
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
  ...props
}: ICustomSwiperProps<T>) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperRef.current && autoplay && data.length > 0) {
      swiperRef.current.autoplay?.start?.();
    }
  }, [data, autoplay]);

  if (!data.length) return null;

  return (
    <div className={`relative max-w-screen h-full ${className}`}>
      {showNavigation && (
        <>
          <button className="custom-swiper-prev hidden lg:grid w-12 aspect-square rounded-full place-content-center bg-primary hover:bg-primary-dark shadow-xl absolute y-center -left-16 z-10 text-white">
            <Icon icon="uiw:left" />
          </button>

          <button className="custom-swiper-next hidden lg:grid w-12 aspect-square rounded-full place-content-center bg-primary hover:bg-primary-dark shadow-xl absolute y-center -right-16 z-10 text-white">
            <Icon icon="uiw:right" />
          </button>
        </>
      )}

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="!h-auto !w-full"
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
          <SwiperSlide key={`key-${i}`}>{renderItem(item, i)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
