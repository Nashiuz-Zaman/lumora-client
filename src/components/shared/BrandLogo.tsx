"use client";

import Image from "next/image";
import Link from "next/link";

interface IBrandLogoProps {
  href?: string;
  className?: string;
  alt?: string;
}

export const BrandLogo = ({
  href = "/",
  className = "",
  alt = "website-logo",
}: IBrandLogoProps) => {
  return (
    <Link href={href} className={`inline-block ${className}`}>
      <Image
        src="/logos/website/logo-white.png"
        alt={alt}
        width={128}
        height={70}
        className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32
          h-auto block"
      />
    </Link>
  );
};
