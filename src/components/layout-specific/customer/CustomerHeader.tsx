"use client";

// Components
import { CartBtn } from "@buttons/CartBtn";
import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";
import { InnerContainer } from "@containers/InnerContainer";
import { UserMenuWithAvatar } from "@/components/shared/UserMenuWithAvatar";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { useAuthState } from "@/hooks/useAuthState";
import { useRefState } from "@/hooks/useRefState";
import { useCartState } from "@/hooks/useCartState";
import { useEffect, useRef } from "react";

export const CustomerHeader = () => {
  const { logout } = useAuthMethods();
  const customerHeaderRef = useRef(null);
  const { user } = useAuthState();
  const { cart } = useCartState();
  const mobileBtnPlaceholdrRef = useRef(null);
  const { setRefs } = useRefState();

  useEffect(() => {
    setRefs((prev) =>
      !prev.customerHeader
        ? { ...prev, customerHeader: customerHeaderRef }
        : prev,
    );

    return () => setRefs((prev) => ({ ...prev, customerHeader: null }));
  }, [setRefs]);

  useEffect(() => {
    setRefs((prev) =>
      !prev.mobileBtnRef
        ? { ...prev, mobileBtnPlaceholder: mobileBtnPlaceholdrRef }
        : prev,
    );

    return () => setRefs((prev) => ({ ...prev, mobileBtnPlaceholder: null }));
  }, [setRefs]);

  return (
    <header
      ref={customerHeaderRef}
      className="h-16 xl:h-28 bg-white border-b border-neutral-200 flex items-center shrink-0"
    >
      <InnerContainer className="flex justify-between items-center">
        {/* Mobile nav button placeholder */}
        <div
          ref={mobileBtnPlaceholdrRef}
          id="mobile-button-portal"
          className="xl:hidden"
        />

        {/* Logo */}
        <CompanyLogoBtn />

        {/* User menu */}
        <div className="flex items-center gap-5">
          {/* shopping cart */}
          <CartBtn itemsQty={cart?.totalItemQty} />

          {user && (
            <UserMenuWithAvatar userData={user} logoutFunction={logout} />
          )}
        </div>
      </InnerContainer>
    </header>
  );
};
