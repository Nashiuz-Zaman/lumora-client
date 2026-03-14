import { Metadata } from "next";
import { SignupPageMain } from "@page-specific/auth-pages/SignupPageMain";

export const metadata: Metadata = {
  title: "Sign Up | Lumora",
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center p-8">
      <SignupPageMain />
    </div>
  );
}
