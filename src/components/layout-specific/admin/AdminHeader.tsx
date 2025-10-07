"use client";

// Core
import Link from "next/link";

// Components
import { InnerContainer, ThreeDotMenu } from "@/components/shared";
import { useAuthMethods, useRefState } from "@/hooks";
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
        <Link href="/" className="hidden xl:block">
          <p className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-300 bg-clip-text text-transparent text-2xl">
            Lumora
          </p>
        </Link>

        {/* User menu */}
        <div className="flex items-center gap-5">
          <ThreeDotMenu logoutFunction={logout} />
        </div>
      </InnerContainer>
    </header>
  );
};
