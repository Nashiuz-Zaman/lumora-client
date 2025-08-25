"use client";

import { AuthForm, IAuthForm } from "@/components/page-specific";
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
    data: IAuthForm,
    setError: UseFormSetError<IAuthForm>
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
