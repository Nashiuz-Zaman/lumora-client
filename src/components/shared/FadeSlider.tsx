"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

interface IFadeSliderProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  autoPlayInterval?: number;
  className?: string;
  slideSwitcher?: boolean;
  slideNavigator?: boolean;
}

export const FadeSlider = <T,>({
  data,
  renderItem,
  autoPlayInterval = 3000,
  className = "",
  slideSwitcher = false,
  slideNavigator = false,
}: IFadeSliderProps<T>) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    if (!autoPlayInterval) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, autoPlayInterval);
  }, [autoPlayInterval, stopAutoPlay, data.length]);

  useEffect(() => {
    if (!data.length) return;
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay, data.length]);

  const goToSlide = (i: number) => setCurrent(i);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % data.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + data.length) % data.length);

  if (!data.length) return null;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Slides */}
      {data.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {renderItem(item, i)}
        </div>
      ))}

      {/* Arrows */}
      {slideNavigator && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 y-center bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 y-center bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ›
          </button>
        </>
      )}

      {/* Switchers */}
      {slideSwitcher && (
        <div className="absolute bottom-4 x-center flex gap-2 z-300">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
