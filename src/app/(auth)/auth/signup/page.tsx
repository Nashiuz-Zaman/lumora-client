import { Metadata } from "next";
import { SignupPageMain } from "@/components/page-specific/auth/SignupPageMain";

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
