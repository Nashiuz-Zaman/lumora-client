"use client";

import React, { useMemo } from "react";
import { CaretLeftIcon, CaretRightIcon } from "./icons";

type IPaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  className = "",
}: IPaginationProps) => {
  // clamp totalPages and currentPage defensively
  const total = Math.max(0, Math.floor(totalPages));
  const cur = Math.max(1, Math.floor(currentPage));

  const pageRange = useMemo(() => {
    const maxButtons = 5;
    if (total <= 0) return [];
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(maxButtons / 2); // 2
    let start = cur - half;
    let end = cur + half;

    if (start < 1) {
      start = 1;
      end = maxButtons;
    }
    if (end > total) {
      end = total;
      start = total - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [total, cur]);

  if (total <= 1) return null;

  const goTo = (page: number) => {
    const p = Math.max(1, Math.min(total, +page));
    if (p !== cur) setCurrentPage(p);
  };

  const prevDisabled = cur <= 1;
  const nextDisabled = cur >= total;

  return (
    <div
      className={`flex gap-1 text-lg justify-center ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => goTo(cur - 1)}
        className={`grid place-content-center cursor-pointer text-primary text-2xl ${
          prevDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
        aria-disabled={prevDisabled}
        aria-label="Previous page"
      >
        <CaretLeftIcon />
      </button>

      <p className="px-2 flex items-center md:px-3 lg:px-4 !leading-none">
        Page {cur} of {total}
      </p>

      {pageRange.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          aria-current={p === cur ? "page" : undefined}
          className={`block px-2 cursor-pointer ${
            p === cur
              ? "font-bold text-primary underline underline-offset-4"
              : "hover:underline hover:underline-offset-4"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goTo(cur + 1)}
        className={`grid place-content-center cursor-pointer text-primary text-2xl ${
          nextDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
        aria-disabled={nextDisabled}
        aria-label="Next page"
      >
        <CaretRightIcon />
      </button>
    </div>
  );
};
