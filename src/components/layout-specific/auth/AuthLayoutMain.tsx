"use client";

import { LeftColumnContent } from "@/components/page-specific";
import { ReactNode } from "react";

const authImages = [
  { src: "/auth-images/auth-1.webp", alt: "Auth Image 1" },
  { src: "/auth-images/auth-2.webp", alt: "Auth Image 2" },
  { src: "/auth-images/auth-3.webp", alt: "Auth Image 3" },
  { src: "/auth-images/auth-4.webp", alt: "Auth Image 4" },
];

export const AuthLayoutMain = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col max-w-480 mx-auto overflow-x-hidden">
      <main className="grow grid grid-cols-1 lg:grid-cols-2">
        {/* Left gradient section */}
        <div className="relative hidden lg:flex items-center justify-center bg-linear-to-br from-primary to-pink-500">
          <LeftColumnContent
            images={authImages}
            subtitle={
              <>
                From tech gadgets to gourmet food, fashion to home essentials —
                discover everything you need in one place.
              </>
            }
          />
        </div>

        {children}
      </main>
    </div>
  );
};
