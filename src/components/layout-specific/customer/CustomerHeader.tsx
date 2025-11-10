"use client";

// Components
import {
  CompanyLogoBtn,
  InnerContainer,
  UserMenuWithAvatar,
} from "@/components/shared";
import { useAuthMethods, useAuthState, useRefState } from "@/hooks";
import { useEffect, useRef } from "react";

export const CustomerHeader = () => {
  const { logout } = useAuthMethods();
  const adminHeaderRef = useRef(null);
  const { user } = useAuthState();
  const mobileBtnPlaceholdrRef = useRef(null);
  const { setRefs } = useRefState();

  useEffect(() => {
    setRefs((prev) =>
      !prev.adminHeader ? { ...prev, adminHeader: adminHeaderRef } : prev
    );

    return () => setRefs((prev) => ({ ...prev, adminHeader: null }));
  }, [setRefs]);

  useEffect(() => {
    setRefs((prev) =>
      !prev.mobileBtnRef
        ? { ...prev, mobileBtnPlaceholder: mobileBtnPlaceholdrRef }
        : prev
    );

    return () => setRefs((prev) => ({ ...prev, mobileBtnPlaceholder: null }));
  }, [setRefs]);

  return (
    <header
      ref={adminHeaderRef}
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
          {user && <UserMenuWithAvatar userData={user} logoutFunction={logout} />}
        </div>
      </InnerContainer>
    </header>
  );
};
