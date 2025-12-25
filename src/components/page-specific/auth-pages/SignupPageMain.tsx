"use client";

import { AuthForm, TAuthForm } from "@/components/page-specific";
import { CompanyLogoBtn } from "@/components/shared";
import { useAuthMethods } from "@/hooks/useAuthMethods"; 
import { UseFormSetError } from "react-hook-form";

export const SignupPageMain = () => {
  const {
    signupUser,
    loginWithGoogle,
    isSignupUserLoading,
    isSocialLoginLoading,
  } = useAuthMethods();

  const handleSignup = async (
    data: TAuthForm,
    setError: UseFormSetError<TAuthForm>
  ) => {
    await signupUser({
      data,
      setError,
    });
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="max-w-md w-full">
      <CompanyLogoBtn className="block! lg:hidden! w-max! mx-auto mb-12 text-4xl" />

      <AuthForm
        mode="signup"
        onSubmit={handleSignup}
        onGoogleLogin={handleGoogleLogin}
        isLoading={isSignupUserLoading || isSocialLoginLoading}
      />
    </div>
  );
};
