import Link from "next/link";
import { InnerContainer, CompanyLogoBtn } from "../../shared";

import { HeaderSearchAvatarAuthOptions } from "./HeaderSearchAvatarAuthOptions";
import MegaMenuServerWrapper from "./MegamenuServerWrapper";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="sticky animated-header top-0 z-2000 w-full">
      {/* Top promo / links bar */}
      <InnerContainer className="text-sm xl:text-base py-3 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <p className="text-center text-secondary-dark md:text-left">
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

      <Suspense>
        <MegaMenuServerWrapper />
      </Suspense>
    </header>
  );
};

export default Header;
