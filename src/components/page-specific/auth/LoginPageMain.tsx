"use client";

import { UseFormSetError } from "react-hook-form";
import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { AuthForm, TAuthForm } from "./AuthForm";

export const LoginPageMain = () => {
  const { localLogin, isLocalLoginLoading, loginWithGoogle } = useAuthMethods();

  const handleLogin = async (
    data: TAuthForm,
    setError: UseFormSetError<TAuthForm>,
  ) => {
    await localLogin({
      data,
      setError,
    });
  };

  return (
    <div className="max-w-md w-full">
      <CompanyLogoBtn className="block! lg:hidden! w-max! mx-auto mb-12 text-4xl" />

      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        onGoogleLogin={loginWithGoogle}
        isLoading={isLocalLoginLoading}
      />
    </div>
  );
};
