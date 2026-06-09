import { Metadata } from "next";
import { LoginPageMain } from "@/components/page-specific/auth/LoginPageMain";

export const metadata: Metadata = {
  title: "Login | Lumora",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoginPageMain />
    </div>
  );
}
