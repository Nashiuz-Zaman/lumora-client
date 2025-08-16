"use client";

// core
import Image from "next/image";

// components
import { InnerContainer } from "@/components/shared";
import LogoSocials from "./LogoSocials";
import NavAddress from "./NavAddress";

// data
import { socialMediaLinks } from "@/static-data/footerData";

const Footer = () => {
  const curYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-primary-dark to-purple-500 text-white mt-auto">
      <InnerContainer>
        {/* Top grid: logo/socials + navigation/address */}
        <div className="grid grid-cols-1 gap-8 py-8 lg:pt-14 lg:pb-6 xl:grid-cols-[1fr_1.3fr]">
          {/* Logo + socials */}
          <div className="flex flex-col gap-6">
            <LogoSocials socialMediaLinks={socialMediaLinks} />
          </div>

          {/* Navigation + address */}
          <div className="flex flex-col gap-6 md:gap-8">
            <NavAddress />
          </div>
        </div>

        {/* Payment methods */}
        <div className="flex justify-center">
          <Image
            src="/logos/payment-portal/payment.webp"
            alt="Payment options"
            width={598}
            height={63}
            className="w-[12rem] sm:w-[14rem] md:w-[18rem] lg:w-[24rem] xl:w-[32rem] 2xl:w-[37rem] h-auto my-6 lg:my-10"
          />
        </div>

        {/* Copyright */}
        <small className="block text-center mb-6 text-xs sm:text-sm text-white px-4">
          © {curYear} | All Rights Reserved
        </small>
      </InnerContainer>
    </footer>
  );
};

export default Footer;
