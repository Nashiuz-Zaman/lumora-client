"use client";

import Link from "next/link";

interface ICompanyLogoBtnProps {
  className?: string;
  isBgDark?: boolean; // if true → show white version
}

export const CompanyLogoBtn = ({
  className = "",
  isBgDark = false,
}: ICompanyLogoBtnProps) => {
  return (
    <Link href="/" className={`block ${className}`}>
      <p
        className={
          isBgDark
            ? "text-white text-2xl font-semibold"
            : "inline-block bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
        }
      >
        Lumora
      </p>
    </Link>
  );
};
