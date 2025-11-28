"use client";

import Link from "next/link";

interface ICompanyLogoBtnProps {
  className?: string;
}

export const CompanyLogoBtn = ({ className = "" }: ICompanyLogoBtnProps) => {
  return (
    <Link href="/" className={className}>
      <p className="inline-block bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl">
        Lumora
      </p>
    </Link>
  );
};
