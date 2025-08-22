"use client";

// lib
import { Icon } from "@iconify/react";

type PaginationProps = {
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
}: PaginationProps) => {
  const pageBtns = Array.from({ length: totalPages });

  return (
    <div
      className={`flex gap-1 md:gap-1 text-xs lg:text-base 2xl:text-lg justify-center ${className}`}
    >
      <button
        onClick={() => {
          setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
        }}
        className="grid place-content-center text-primary text-2xl"
      >
        <Icon icon="tdesign:chevron-left" className="!leading-[150%]" />
      </button>

      <p className="px-2 flex items-center md:px-3 lg:px-4 !leading-none">
        Page {currentPage} of {totalPages}
      </p>

      {pageBtns.length > 0 &&
        pageBtns.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`block px-2 ${
              currentPage === i + 1
                ? "font-bold text-primary underline underline-offset-4"
                : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

      <button
        onClick={() => {
          setCurrentPage(
            currentPage < totalPages ? currentPage + 1 : totalPages
          );
        }}
        className="grid place-content-center text-primary text-2xl"
      >
        <Icon icon="tdesign:chevron-right" className="!leading-[150%]" />
      </button>
    </div>
  );
};
