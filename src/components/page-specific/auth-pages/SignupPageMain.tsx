"use client";

import { AuthForm, TAuthForm } from "@/components/page-specific";
import { useAuthMethods } from "@/hooks/useAuthMethods"; // adjust path if needed
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
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      onGoogleLogin={handleGoogleLogin}
      isLoading={isSignupUserLoading || isSocialLoginLoading}
    />
  );
};
