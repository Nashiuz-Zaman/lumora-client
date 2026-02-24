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
    <Link href="/" className={`inline-block text-2xl ${className}`}>
      <p
        className={`${
          isBgDark
            ? "text-neutral-50"
            : "bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        } [font-size:inherit]`}
      >
        Lumora
      </p>
    </Link>
  );
};
