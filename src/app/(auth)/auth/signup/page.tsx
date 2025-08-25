//  THIS IS A PAGE

import { SignupPageMain } from "@/components/page-specific";

export const metadata = {
  title: "Sign Up | Lumora",
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center bg-white p-8">
      <SignupPageMain />
    </div>
  );
}
