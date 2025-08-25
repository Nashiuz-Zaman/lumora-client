//  THIS IS A PAGE

import { LoginPageMain } from "@/components/page-specific/auth-pages/LoginPageMain";

export const metadata = {
  title: "Login | Lumora",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-white p-8">
      <LoginPageMain />
    </div>
  );
}
