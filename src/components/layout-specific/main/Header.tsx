"use client";

import { useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
import { MobileMegaMenu } from "./MobileMegaMenu";
import {
  BREAKPOINTS,
  useAuthMethods,
  useAuthState,
  useCartState,
  useMediaQuery,
} from "@/hooks";
import { ISearchbarResultProduct } from "@/types";
import { useLazySearchInSearchbarQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { UserRoles } from "@/constants/user";
import { useHeaderScrollAnim } from "@/hooks/useHeaderScrollAnim";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type THeaderProps = IMegaMenuProps;

const Header = ({ categories }: THeaderProps) => {
  const { logout } = useAuthMethods();
  const { user } = useAuthState();
  const { cart } = useCartState();
  const isMinSm = useMediaQuery(BREAKPOINTS.min["sm"]!);

  const headerRef = useHeaderScrollAnim();

  const { isAdmin, isCustomer, isAuthenticated } = useMemo(() => {
    const roleName = user?.role?.name;

    const admin =
      roleName === UserRoles.admin || roleName === UserRoles.superAdmin;
    return {
      isAdmin: admin,
      isCustomer: roleName === UserRoles.customer && !admin,
      isAuthenticated: !!user && !!user._id, // Ensure user has an ID or unique property
    };
  }, [user]);

  // Search logic
  const [triggerSearch, { data, isFetching, isSuccess }] =
    useLazySearchInSearchbarQuery();

  // FIX: Memoize results to prevent unnecessary re-renders of the search child components
  const results = useMemo(
    () => (!isFetching && isSuccess && data?.data?.products) || [],
    [isFetching, isSuccess, data],
  );

  const renderResult = (
    item: ISearchbarResultProduct,
    _index: number,
    onClick: () => void,
  ): React.ReactNode => (
    <SearchbarProductCard
      onClick={onClick}
      title={item.title}
      slug={item?.slug}
      src={item.defaultImage}
    />
  );

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

            {!isAuthenticated ? (
              <div className="flex gap-4 font-medium">
                <Link className="hover:underline" href="/auth/login">
                  Login
                </Link>
                <Link className="hover:underline" href="/auth/signup">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <CartBtn itemsQty={cart?.totalItemQty || 0} />

                {/* 3. KEY FIX: If 'user' exists but avatar doesn't show, 
                  it's often because the parent container isn't re-evaluating 
                  the 'user' truthiness correctly. 
                */}
                {isAdmin && <UserMenuWithoutAvatar logoutFunction={logout} />}

                {isCustomer && user && (
                  <UserMenuWithAvatar userData={user} logoutFunction={logout} />
                )}
              </div>
            )}
          </div>
        </InnerContainer>

        {/* Mobile-only search bar portal target */}
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
