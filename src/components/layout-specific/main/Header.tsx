"use client";

// core
import Image from "next/image";
import Link from "next/link";

// component
import { CartBtn, LinkBtn } from "../../buttons";
import NavBtn from "../../shared/NavBtn";
import { Searchbar } from "../../shared";

// hook
import { useModalVisibility, useMobileNavigation } from "@/hooks";

import { InnerContainer } from "../../containers";
import useAppState from "@/hooks/useAppState";
import UserProfile from "@/components/shared/UserProfile";
import useAuthMethods from "@/hooks/useAuthMethods";
import Notifications from "@/components/shared/Notifications";
import ExpandableSearchPortal from "@/components/shared/ExpandableSearchPortal";

// types
import type { FC, MouseEventHandler } from "react";

const Header: FC = () => {
  const { openSocialLoginModal, openCreateAccountModal } = useModalVisibility();
  const { user } = useAppState();
  const { logout } = useAuthMethods();
  const { openMobileNav } = useMobileNavigation();

  const btnClasses = " font-medium whiteOutlinedClasses !rounded-full";

  return (
    <header>
      <p className="bg-neutral-100 text-2xs lg:text-base py-3 text-center px-4 xs:px-6">
        Order & Get your items from USA in 15 Days (T&C Applied)
      </p>

      <div className="bg-gradient-to-r from-primaryDark to-purple-500">
        <InnerContainer modifyClasses="flex items-center flex-wrap py-5 xl:py-6">
          {/* mobile nav btn */}
          <NavBtn
            onClick={openMobileNav as MouseEventHandler<HTMLButtonElement>}
            modifyClasses="2md:hidden mr-[1.19rem]"
          />

          {/* logo */}
          <Link href="/">
            <Image
              width={128}
              height={70}
              src="/website-logo/logo-header.svg"
              alt="website-logo"
              className="block w-[3.2rem] md:w-[3.95113rem] xl:w-32 h-auto sm:mr-[1.79rem] xl:mr-[3.625rem]"
            />
          </Link>

          {/* search bar */}
          <Searchbar modifyClasses="hidden 2md:block" />

          {/* order and traveler signup */}
          <div className="hidden 2md:flex items-center gap-2 lg:gap-4 ml-auto lg:text-sm xl:text-base">
            <LinkBtn href="/" modifyClasses={btnClasses}>
              How to Order
            </LinkBtn>

            {!user && (
              <LinkBtn href="/signup/traveler" modifyClasses={btnClasses}>
                Traveler SignUp
              </LinkBtn>
            )}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <ExpandableSearchPortal
              portalTargetId="header-search-mobile-screen"
              buttonClasses="2md:!hidden text-xl"
              horizontalAccordionClasses="mb-5 xl:pb-6"
            />

            {/* header nav options */}
            {!user && (
              <div className="flex gap-4 font-semibold text-2xs lg:text-xs xl:text-base text-white">
                <button onClick={openCreateAccountModal}>Sign Up</button>
                <button onClick={openSocialLoginModal}>Log In</button>
              </div>
            )}

            {/* shopping cart link */}
            <CartBtn />

            {user?._id && (
              <div className="flex items-center gap-4">
                <Notifications
                  className="text-white text-3xl 2xl:text-4xl"
                  countClassName="bg-white !text-red-600"
                />
                <UserProfile userData={user} logoutFunction={logout} />
              </div>
            )}
          </div>
        </InnerContainer>

        {/* Mobile-only search bar portal target */}
        <InnerContainer modifyClasses="2md:hidden">
          <div id="header-search-mobile-screen" className="w-full h-max"></div>
        </InnerContainer>
      </div>
    </header>
  );
};

export default Header;
