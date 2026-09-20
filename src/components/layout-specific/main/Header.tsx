import Link from "next/link";
import { CompanyLogoBtn } from "../../shared/buttons/CompanyLogoBtn";
import { HeaderSearchAvatarAuthOptions } from "./HeaderSearchAvatarAuthOptions";
import MegaMenuServerWrapper from "./MegamenuServerWrapper";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="sticky animated-header top-0 bg-white z-1000 w-full">
      {/* Top promo and links bar */}
      <div className="text-xs xl:text-sm py-3 padded max-w-[1920px] mx-auto flex flex-col lg:flex-row lg:justify-between font-light gap-2 items-center">
        <p className="text-center md:text-left capitalize">
          Use LUCKY50 to get 50% Off. T&C applies.
        </p>

        <div className="flex justify-center lg:justify-end gap-4 [&>a]:hover:text-primary [&>a:transition-colors]">
          <Link href="/track-order">Track Your Order</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/returns">Returns</Link>
        </div>
      </div>

      {/* Main header content */}
      <div className="border-y border-zinc-100">
        <div className="flex padded max-w-[1920px] mx-auto items-center flex-wrap py-5 xl:py-6">
          <CompanyLogoBtn className="mr-6 tracking-tighter uppercase font-bold!" />

          <HeaderSearchAvatarAuthOptions />
        </div>

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
