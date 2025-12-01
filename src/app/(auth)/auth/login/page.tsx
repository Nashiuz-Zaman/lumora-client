//  THIS IS A PAGE

import { LoginPageMain } from "@/components/page-specific/auth-pages/LoginPageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Lumora",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-white p-8">
      <LoginPageMain />
    </div>
  );
}
