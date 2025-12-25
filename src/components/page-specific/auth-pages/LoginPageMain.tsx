"use client";

import { AuthForm, TAuthForm } from "@/components/page-specific";
import { CompanyLogoBtn } from "@/components/shared";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { UseFormSetError } from "react-hook-form";

export const LoginPageMain = () => {
  const { localLogin, isLocalLoginLoading } = useAuthMethods();

  const handleLogin = async (
    data: TAuthForm,
    setError: UseFormSetError<TAuthForm>
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
        isLoading={isLocalLoginLoading}
      />
    </div>
  );
};
