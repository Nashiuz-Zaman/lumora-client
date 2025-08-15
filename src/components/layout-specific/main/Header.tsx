"use client";

// core
import Image from "next/image";
import Link from "next/link";

// component
import { CartBtn, MobileMenuBtn } from "../../shared/buttons";
import { InnerContainer } from "../../shared/containers";

import ExpandableSearchPortal from "@/components/shared/ExpandableSearchPortal";

// types
import type { MouseEventHandler } from "react";
import UserAvatarMenu from "@/components/shared/UserAvatarMenu";
import Searchbar from "@/components/shared/Searchbar";
// import { UserRoles } from "@/constants/user";

const Header = () => {
  // Temporary mock handlers
  const openSocialLoginModal = () => console.log("Open Social Login Modal");
  const openCreateAccountModal = () => console.log("Open Create Account Modal");
  const logout = () => console.log("Logout clicked");
  const openMobileNav: MouseEventHandler<HTMLButtonElement> = () =>
    console.log("Open Mobile Navigation");

  return (
    <header>
      <p className="bg-neutral-100 text-2xs lg:text-base py-3 text-center px-4 xs:px-6">
        Order & Get your items from USA in 15 Days (T&C Applied)
      </p>

      <div className="bg-gradient-to-r from-primary-dark to-purple-500">
        <InnerContainer className="flex items-center flex-wrap py-5 xl:py-6">
          {/* mobile nav btn */}
          <MobileMenuBtn
            onClick={openMobileNav}
            className="2md:hidden mr-1 text-white text-2xl"
          />

          {/* logo */}
          <Link href="/">
            <Image
              width={128}
              height={70}
              src="/logos/website/logo-white.png"
              alt="website-logo"
              className="block w-[3.2rem] md:w-[3.95113rem] xl:w-32 h-auto sm:mr-[1.79rem] xl:mr-[3.625rem]"
            />
          </Link>

          {/* search bar */}
          <Searchbar className="hidden 2md:block" />

          <div className="ml-auto flex items-center gap-4">
            <ExpandableSearchPortal
              portalTargetId="header-search-mobile-screen"
              buttonClasses="2md:!hidden text-xl"
              horizontalAccordionClasses="mb-5 xl:pb-6"
            />

            {/* header nav options */}
            {!false && (
              <div className="flex gap-4 font-semibold text-2xs lg:text-xs xl:text-base text-white">
                <button onClick={openCreateAccountModal}>Sign Up</button>
                <button onClick={openSocialLoginModal}>Log In</button>
              </div>
            )}

            {/* shopping cart link */}
            <CartBtn />

            {false && (
              <div className="flex items-center gap-4">
                <UserAvatarMenu  logoutFunction={logout} />
              </div>
            )}
          </div>
        </InnerContainer>

        {/* Mobile-only search bar portal target */}
        <InnerContainer className="2md:hidden">
          <div id="header-search-mobile-screen" className="w-full h-max"></div>
        </InnerContainer>
      </div>
    </header>
  );
};

export default Header;
