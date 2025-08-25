//  THIS IS A PAGE

import { SignupPageMain } from "@/components/page-specific";
import { LeftColumnContent } from "@/components/page-specific/auth-pages/LeftColumnContent";

export const metadata = {
  title: "Sign Up | Lumora",
};

const authImages = [
  { src: "/auth-images/auth-1.webp", alt: "Auth Image 1" },
  { src: "/auth-images/auth-2.webp", alt: "Auth Image 2" },
  { src: "/auth-images/auth-3.webp", alt: "Auth Image 3" },
  { src: "/auth-images/auth-4.webp", alt: "Auth Image 4" },
];

export default function SignupPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left gradient section */}
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-primary   to-pink-500">
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

      {/* Right form section */}
      <div className="flex items-center justify-center bg-white p-8">
        <SignupPageMain />
      </div>
    </div>
  );
}
