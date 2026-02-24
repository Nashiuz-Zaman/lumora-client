"use client";

import Link from "next/link";
import { InnerContainer, CompanyLogoBtn } from "../../shared";
import { IMegaMenuProps, MegaMenu } from "./MegaMenu";
import { MobileMegaMenu } from "./MobileMegaMenu";
import { useHeaderScrollAnim } from "@/hooks/useHeaderScrollAnim";
import { useEffect, useState } from "react";
import { HeaderSearchAvatarAuthOptions } from "./HeaderSearchAvatarAuthOptions";

type THeaderProps = IMegaMenuProps;

const Header = ({ categories }: THeaderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsClient(true), 0);
  }, []);

  const headerRef = useHeaderScrollAnim();

  if (!isClient) return;

  return (
    <header ref={headerRef} className="sticky top-0 z-2000 w-full">
      {/* Top promo / links bar */}
      <InnerContainer className="text-sm xl:text-base py-3 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <p className="text-center md:text-left">
            Shop now and enjoy free shipping to West Coast states!
          </p>
          <div className="flex justify-center md:justify-end gap-6 font-medium [&>a]:hover:underline">
            <Link href="/track-order">Track Your Order</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/returns">Returns</Link>
          </div>
        </div>
      </InnerContainer>

      {/* Main header content */}
      <div className="bg-white border-y border-neutral-100">
        <InnerContainer className="flex items-center flex-wrap py-5 xl:py-6">
          <CompanyLogoBtn className="mr-6" />

          {/* 2. Now dynamically loaded */}
          <HeaderSearchAvatarAuthOptions />
        </InnerContainer>

        <div
          id="header-search-mobile-screen"
          className="w-full h-max 2md:hidden px-4"
        ></div>
      </div>

      <MobileMegaMenu categories={categories} />
      <MegaMenu categories={categories} />
    </header>
  );
};

export default Header;
