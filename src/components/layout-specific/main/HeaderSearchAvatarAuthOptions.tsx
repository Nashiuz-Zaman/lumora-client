"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  HeaderProductsSearchbar,
  ExpandableSearchPortal,
  CartBtn,
  UserMenuWithoutAvatar,
  UserMenuWithAvatar,
  SearchbarProductCard,
} from "../../shared";
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

export const HeaderSearchAvatarAuthOptions = () => {
  const { logout } = useAuthMethods();
  const { user } = useAuthState();
  const { cart } = useCartState();
  const isMinSm = useMediaQuery(BREAKPOINTS.min["sm"]!);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 0);
  }, []);

  // 1. Auth & Role Logic
  const { isAdmin, isCustomer, isAuthenticated } = useMemo(() => {
    const roleName = user?.role?.name;
    const admin =
      roleName === UserRoles.admin || roleName === UserRoles.superAdmin;

    return {
      isAdmin: admin,
      isCustomer: roleName === UserRoles.customer && !admin,
      isAuthenticated: !!user && !!user._id,
    };
  }, [user]);

  // 2. Search Logic
  const [triggerSearch, { data, isFetching, isSuccess }] =
    useLazySearchInSearchbarQuery();

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

  if (isClient)
    return (
      <>
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

              {isAdmin && <UserMenuWithoutAvatar logoutFunction={logout} />}

              {isCustomer && user && (
                <UserMenuWithAvatar userData={user} logoutFunction={logout} />
              )}
            </div>
          )}
        </div>
      </>
    );
};
