//  THIS IS A PAGE

import { SignupPageMain } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Lumora",
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center bg-white p-8">
      <SignupPageMain />
    </div>
  );
}
