"use client";

import {
  InnerContainer,
  ExpandableSearchPortal,
  HeaderProductsSearchbar,
  CartBtn,
  UserMenuWithAvatar,
  SearchbarProductCard,
  UserMenuWithoutAvatar,
  CompanyLogoBtn,
} from "../../shared";

import { IMegaMenuProps, MegaMenu } from "./MegaMenu";
import Link from "next/link";

import { MobileMegaMenu } from "./MobileMegaMenu";
import {
  BREAKPOINTS,
  useAuthMethods,
  useAuthState,
  useCartState,
  useMediaQuery,
} from "@/hooks";
import { useRef } from "react";
import { ISearchbarResultProduct } from "@/types";
import { useLazySearchInSearchbarQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { UserRoles } from "@/constants/user";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(useGSAP, ScrollTrigger);

// ---------------------------------------
// Header prop type
// ---------------------------------------
type THeaderProps = IMegaMenuProps;

const Header = ({ categories }: THeaderProps) => {
  const { logout } = useAuthMethods();
  const { user } = useAuthState();
  const { cart } = useCartState();
  const isMinSm = useMediaQuery(BREAKPOINTS.min["sm"]!);
  const headerRef = useRef<HTMLHeadElement>(null);

  // search hook
  const [triggerSearch, { data, isFetching, isSuccess }] =
    useLazySearchInSearchbarQuery();

  const results = (!isFetching && isSuccess && data?.data?.products) || [];

  useGSAP(
    () => {
      if (!headerRef.current) return;

      const header = headerRef.current;
      let lastScrollY = 0; // track previous scroll

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const current = self.scroll();

          // -------------------------
          // Hide/show header
          // -------------------------
          if (current > lastScrollY) {
            gsap.to(header, {
              y: "-100%",
              duration: 0.4,
              ease: "power3.out",
            });
          } else if (current < lastScrollY) {
            gsap.to(header, {
              y: "0%",
              duration: 0.4,
              ease: "power3.out",
            });
          }

          // -------------------------
          // Box shadow logic
          // -------------------------
          gsap.to(header, {
            boxShadow:
              current > 100
                ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                : "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.3,
            ease: "power3.out",
          });

          lastScrollY = current;
        },
      });
    },
    { dependencies: [] },
  );

  // simple renderer for results
  const renderResult = (
    item: ISearchbarResultProduct,
    _index: number,
    onClick: () => void,
  ): React.ReactNode => {
    return (
      <SearchbarProductCard
        onClick={onClick}
        title={item.title}
        slug={item?.slug}
        src={item.defaultImage}
      />
    );
  };

  // role checks
  const role = user?.role?.name;
  const isAdminRole = role === UserRoles.admin || role === UserRoles.superAdmin;
  const isCustomer = role === UserRoles.customer;

  return (
    <header ref={headerRef} className="sticky top-0 z-2000">
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
      <div className="bg-white border-y border-b-neutral-100 border-t-neutral-100">
        <InnerContainer className="flex items-center flex-wrap py-5 xl:py-6">
          {/* Logo */}
          <CompanyLogoBtn className="mr-6" />

          {/* Desktop search bar */}
          {isMinSm && (
            <HeaderProductsSearchbar<ISearchbarResultProduct>
              results={results}
              renderResult={renderResult}
              showIcon
              trigger={triggerSearch}
              className="border-neutral-200"
              modalClassName="productSearchbarModal"
            />
          )}

          <div className="ml-auto flex items-center gap-4">
            {/* Mobile expandable search */}
            {!isMinSm && (
              <ExpandableSearchPortal
                portalTargetId="header-search-mobile-screen"
                buttonClasses="text-xl"
                horizontalAccordionClasses="mb-5 xl:pb-6"
                results={results}
                renderResult={renderResult}
                trigger={triggerSearch}
                searchbarClasses="border-neutral-200"
                modalClassName="productSearchbarModal"
              />
            )}

            {/* If no user: show login/signup */}
            {!user && (
              <div className="flex gap-4 font-medium">
                <Link className="hover:underline" href="/auth/login">
                  Login
                </Link>
                <Link className="hover:underline" href="/auth/signup">
                  Sign Up
                </Link>
              </div>
            )}

            {/* shopping cart */}
            <CartBtn itemsQty={cart?.totalItemQty} />

            {/* role-based menu */}
            {user && (
              <div className="flex items-center gap-4">
                {/* admin menu btn if user is admin */}
                {isAdminRole && (
                  <UserMenuWithoutAvatar logoutFunction={logout} />
                )}

                {/* or customer menu btn for customers */}
                {isCustomer && (
                  <UserMenuWithAvatar userData={user} logoutFunction={logout} />
                )}
              </div>
            )}
          </div>
        </InnerContainer>

        {/* Mobile-only search bar portal target */}
        <InnerContainer className="2md:hidden">
          <div id="header-search-mobile-screen" className="w-full h-max"></div>
        </InnerContainer>
      </div>

      <MobileMegaMenu categories={categories} />
      <MegaMenu categories={categories} />
    </header>
  );
};

export default Header;
