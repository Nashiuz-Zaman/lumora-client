"use client";

import { AuthForm, TAuthForm } from "@/components/page-specific";
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
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      isLoading={isLocalLoginLoading}
    />
  );
};
