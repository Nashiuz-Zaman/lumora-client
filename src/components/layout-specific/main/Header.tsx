"use client";

// component
import {
  InnerContainer,
  ExpandableSearchPortal,
  BrandLogo,
  Searchbar,
  CartBtn,
  UserAvatarMenu,
  SearchbarProductCard,
} from "../../shared";

import { IMegaMenuProps, MegaMenu } from "./MegaMenu";
import Link from "next/link";

// types
import { MobileMegaMenu } from "./MobileMegaMenu";
import {
  BREAKPOINTS,
  useAuthMethods,
  useCartState,
  useMediaQuery,
} from "@/hooks";
import { useEffect, useState } from "react";
import { ISearchbarResultProduct } from "@/types";
import { useLazySearchInSearchbarQuery } from "@/libs/redux/apiSlices/product/productApiSlice";

type THeaderProps = IMegaMenuProps;

const Header = ({ categories }: THeaderProps) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { logout } = useAuthMethods();
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

  // simple renderer for results (can be customized)
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

  return (
    <header className="relative z-[200]">
      {/* Top promo / links bar */}
      <InnerContainer className="bg-white text-sm xl:text-base py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          {/* Left column: promotional text */}
          <p className="text-center md:text-left">
            Free shipping on orders over $2000! Limited time offer.
          </p>

          {/* Right column: quick links */}
          <div className="flex justify-center md:justify-end gap-6 font-medium [&>a]:hover:underline">
            <a href="/faq">FAQ</a>
            <a href="/returns">Returns</a>
            <a href="/support">Support</a>
            <a href="/support">About</a>
          </div>
        </div>
      </InnerContainer>

      {/* Main header content */}
      <div className="bg-gradient-to-r from-primary to-primary-dark">
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

            {/* header nav options */}
            {!false && (
              <div className="flex gap-4 font-semibold text-white">
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/signup">Sign Up</Link>
              </div>
            )}

            {/* shopping cart link */}
            <CartBtn quantity={cart?.totalItemQty} />

            {false && (
              <div className="flex items-center gap-4">
                <UserAvatarMenu logoutFunction={logout} />
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
