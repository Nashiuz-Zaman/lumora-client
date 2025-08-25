"use client";

import { AuthForm, IAuthForm } from "@/components/page-specific";
import { useAuthMethods } from "@/hooks/useAuthMethods"; // adjust path if needed
import { UseFormSetError } from "react-hook-form";

export const LoginPageMain = () => {
  const { localLogin, isLocalLoginLoading } = useAuthMethods();

  const handleLogin = async (
    data: IAuthForm,
    setError: UseFormSetError<IAuthForm>
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
