"use client";

import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";
// core
import Image from "next/image";
import Link from "next/link";

type TSocialMediaLink = {
  src: string;
  href: string;
  alt?: string;
};

type LogoSocialsProps = {
  socialMediaLinks: TSocialMediaLink[];
};

const LogoSocials = ({ socialMediaLinks }: LogoSocialsProps) => {
  return (
    <div className="">
      {/* Logo */}
      <CompanyLogoBtn
        isBgDark={false}
        className="mb-6 font-semibold uppercase 2xl:text-5xl"
      />

      {/* Description */}
      <p className="text-neutral-400 text-sm leading-relaxed mb-6 lg:max-w-[90%]">
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
                alt={`${media.alt} icon`}
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
