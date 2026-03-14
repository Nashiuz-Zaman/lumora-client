"use client";

// Components
import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";
import { InnerContainer } from "@containers/InnerContainer";
import { UserMenuWithoutAvatar } from "@/components/shared/UserMenuWithoutAvatar";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { useRefState } from "@/hooks/useRefState";
import { useEffect, useRef } from "react";

export const AdminHeader = () => {
  const { logout } = useAuthMethods();
  const adminHeaderRef = useRef(null);
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
          <UserMenuWithoutAvatar logoutFunction={logout} />
        </div>
      </InnerContainer>
    </header>
  );
};
