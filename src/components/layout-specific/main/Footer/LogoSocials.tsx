"use client";

import { CompanyLogoBtn } from "@/components/shared";
// core
import Image from "next/image";
import Link from "next/link";

type SocialMediaLink = {
  src: string;
  href: string;
  alt?: string;
};

type LogoSocialsProps = {
  socialMediaLinks: SocialMediaLink[];
};

const LogoSocials = ({ socialMediaLinks }: LogoSocialsProps) => {
  return (
    <div className="xl:pr-14 2xl:pr-[8.6425rem]">
      {/* Logo */}
      <CompanyLogoBtn isBgDark={true} className="mb-6"/>

      {/* Description */}
      <p className="text-white text-sm sm:text-base leading-relaxed max-w-[32rem] mb-6">
        Shop premium products from Apple, Nike, Gucci, and more—all delivered
        across the USA. Gadgets, fashion, and gourmet foods in one place.
      </p>

      {/* Social Icons */}
      <ul className="flex items-center gap-4">
        {socialMediaLinks?.map((media, i) => (
          <li key={i}>
            <Link
              href={media.href}
              className="block p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Image
                src={media.src}
                alt={media.alt || "Social media link"}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoSocials;
