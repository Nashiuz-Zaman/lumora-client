"use client";

import {
  useState,
  useRef,
  useMemo,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { flushSync } from "react-dom";

import { CaretLeftIcon, CaretRightIcon } from "./icons";

interface ISliderProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  slideNavigator?: boolean;
  slideSwitcher?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export const Slider = <T,>({
  data,
  renderItem,
  slideNavigator = false,
  slideSwitcher = false,
  autoPlayInterval = 3000,
  className = "",
}: ISliderProps<T>) => {
  const switcherRefs = useRef<HTMLButtonElement[]>([]);
  const [current, setCurrent] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Build slides with clones ---
  const slides = useMemo(
    () => [data[data.length - 1], ...data, data[0]],
    [data]
  );

  useEffect(() => {
    const switchers = switcherRefs.current;
    const activeClass = "!bg-white";

    if (switchers?.length) {
      switchers.forEach((s) => s.classList.remove(activeClass));
      let dotIndex = current - 1;
      if (current === 0) dotIndex = data.length - 1;
      if (current === slides.length - 1) dotIndex = 0;
      switchers[dotIndex]?.classList.add(activeClass);
    }
  }, [current, slides, data.length]);

  const handleTransitionEnd = () => {
    flushSync(() => setIsAnimating(false));
    if (current <= 0) {
      flushSync(() => setCurrent(slides.length - 2));
    } else if (current >= slides.length - 1) {
      flushSync(() => setCurrent(1));
    }
  };

  // --- Autoplay helpers ---
  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay(); // prevent multiple intervals
    if (!autoPlayInterval) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setIsAnimating(true);
    }, autoPlayInterval);
  }, [autoPlayInterval, stopAutoPlay]);

  // --- Manual slide functions ---
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    flushSync(() => setIsAnimating(true));
    setCurrent((prev) => prev + 1);
    stopAutoPlay();
    startAutoPlay();
  }, [isAnimating, startAutoPlay, stopAutoPlay]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    flushSync(() => setIsAnimating(true));
    setCurrent((prev) => prev - 1);
    stopAutoPlay();
    startAutoPlay();
  }, [isAnimating, startAutoPlay, stopAutoPlay]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      flushSync(() => setIsAnimating(true));
      setCurrent(index + 1);
      stopAutoPlay();
      startAutoPlay();
    },
    [isAnimating, startAutoPlay, stopAutoPlay]
  );

  // --- Autoplay lifecycle ---
  useEffect(() => {
    if (!autoPlayInterval) return;
    startAutoPlay();
    return () => stopAutoPlay();
  }, [autoPlayInterval, startAutoPlay, stopAutoPlay]);

  if (!data.length) return null;

  return (
    <div
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      className={`relative overflow-hidden w-full h-full ${className}`}
    >
      {/* Slides wrapper */}
      <div
        className={`flex w-full h-full ${
          isAnimating ? "transition-transform duration-500 ease-out" : ""
        }`}
        style={{ transform: `translateX(${-100 * current}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((item, i) => (
          <div key={i} className="w-full h-full grow-0 shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {slideNavigator && (
        <>
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer y-center left-2  bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <CaretLeftIcon />
          </button>
          <button
            onClick={nextSlide}
            className="absolute cursor-pointer y-center right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <CaretRightIcon />
          </button>
        </>
      )}

      {/* Slide Switchers */}
      {slideSwitcher && (
        <div className="absolute bottom-4 x-center flex gap-2">
          {data.map((_, i) => (
            <button
              key={`key-${i}`}
              ref={(el) => {
                if (el && !switcherRefs.current.includes(el)) {
                  switcherRefs.current.push(el);
                }
              }}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full bg-white/50 cursor-pointer`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
