"use client";

import {
  InnerContainer,
  ExpandableSearchPortal,
  BrandLogo,
  Searchbar,
  CartBtn,
  UserAvatarMenu,
  SearchbarProductCard,
  ThreeDotMenu,
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
import { useEffect, useState } from "react";
import { ISearchbarResultProduct } from "@/types";
import { useLazySearchInSearchbarQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { UserRoles } from "@/constants/user"; 

type THeaderProps = IMegaMenuProps;

const Header = ({ categories }: THeaderProps) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { logout } = useAuthMethods();
  const { user } = useAuthState();
  const { cart } = useCartState();

  // search hook
  const [triggerSearch, { data, isFetching, isSuccess }] =
    useLazySearchInSearchbarQuery();

  const results = (!isFetching && isSuccess && data?.data?.products) || [];
  const isSm = useMediaQuery(BREAKPOINTS.min["sm"]!);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // simple renderer for results
  const renderResult = (
    item: ISearchbarResultProduct,
    _index: number,
    onClick: () => void
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
    <header className="relative top-0 z-[200]">
      {/* Top promo / links bar */}
      <InnerContainer className="bg-white text-sm xl:text-base py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <p className="text-center md:text-left">
            Free shipping on orders over $2000! Limited time offer.
          </p>

          <div className="flex justify-center md:justify-end gap-6 font-medium [&>a]:hover:underline">
            <Link href="/faq">FAQ</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </InnerContainer>

      {/* Main header content */}
      <div className="bg-gradient-to-r from-primary to-primary-light">
        <InnerContainer className="flex items-center flex-wrap py-5 xl:py-6">
          {/* logo */}
          <BrandLogo className="mr-6" />

          {/* Desktop search bar */}
          {isSm && (
            <Searchbar<ISearchbarResultProduct>
              results={results}
              renderResult={renderResult}
              showIcon
              trigger={triggerSearch}
              modalClassName="productSearchbarModal"
            />
          )}

          <div className="ml-auto flex items-center gap-4">
            {/* Mobile expandable search */}
            {!isSm && (
              <ExpandableSearchPortal
                portalTargetId="header-search-mobile-screen"
                buttonClasses="text-xl"
                horizontalAccordionClasses="mb-5 xl:pb-6"
                results={results}
                renderResult={renderResult}
                trigger={triggerSearch}
                modalClassName="productSearchbarModal"
              />
            )}

            {/* If no user: show login/signup */}
            {!user && (
              <div className="flex gap-4 font-semibold text-white">
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/signup">Sign Up</Link>
              </div>
            )}

            {/* shopping cart */}
            <CartBtn quantity={cart?.totalItemQty} />

            {/* role-based menu */}
            {user && (
              <div className="flex items-center gap-4">
                {isAdminRole && (
                  <ThreeDotMenu
                    className="[&_.three-dot-icon]:text-white [&_.three-dot-icon]:hover:text-primary"
                    logoutFunction={logout}
                  />
                )}
                {isCustomer && (
                  <UserAvatarMenu userData={user} logoutFunction={logout} />
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
