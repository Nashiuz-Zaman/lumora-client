"use client";

// Core
import Link from "next/link";
import { Ref } from "react";

// Components
import { InnerContainer, ThreeDotMenu } from "@/components/shared";
import { useAuthMethods } from "@/hooks";

export const AdminHeader = ({ ref }: { ref: Ref<HTMLElement> }) => {
  const { logout } = useAuthMethods();

  return (
    <header
      ref={ref}
      className="h-[5rem] xl:h-[7rem] bg-white border-b border-neutral-200 flex items-center"
    >
      <InnerContainer className="flex justify-between items-center">
        {/* Mobile nav button placeholder */}
        <div id="mobile-button-portal" className="xl:hidden" />

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
