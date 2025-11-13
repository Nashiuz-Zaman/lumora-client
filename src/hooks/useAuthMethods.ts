"use client";
import { UserRoles } from "@/constants";

import { showToast, catchAsyncGeneral } from "@/utils";
import { useRouter } from "next/navigation";
import { useAuthState } from "./useAuthState";
import {
  ILocalLoginRequest,
  useLocalLoginMutation,
  useSocialLoginMutation,
  useLogoutMutation,
} from "@/libs/redux/apiSlices/auth/authApiSlice";

import useFirebaseMethods from "./useFirebaseMethods";
import { useSignupCustomerMutation } from "@/libs/redux/apiSlices/customer/customerApiSlice";
import { IAuthForm } from "@/components/page-specific";
import { UseFormSetError } from "react-hook-form";

export interface IGoogleUser {
  name: string | null;
  email: string | null;
  image: string | null;
}

export const useAuthMethods = () => {
  const [login, { isLoading: isLocalLoginLoading }] = useLocalLoginMutation();
  const [logoutTrigger, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const [signup, { isLoading: isSignupUserLoading }] = useSignupCustomerMutation();
  const [socialLogin, { isLoading: isSocialLoginLoading }] =
    useSocialLoginMutation();

  const router = useRouter();
  const { setUser } = useAuthState();
  const { customer } = UserRoles;
  const { loginGoogle } = useFirebaseMethods();

  const signupUser = catchAsyncGeneral(
    async (args) => {
      const data = args?.data;
      const onSuccess = args?.onSucess;

      const res = await signup(data).unwrap();

      if (res?.success) {
        if (onSuccess && typeof onSuccess === "function") onSuccess();
        showToast({
          message: res?.message,
        });

        router.push(`/auth/confirmation-email-sent?email=${res?.data?.email}`);
      }
    },
    {
      handleError: "function",
      onError: (_, args, message) => {
        const setError = args?.setError as UseFormSetError<IAuthForm>;

        setError("root", {
          type: "manual",
          message: message,
        });
      },
    }
  );

  const localLogin = catchAsyncGeneral(
    async (args) => {
      const data = args?.data as ILocalLoginRequest;
      const onSuccess = args?.onSucess;

      const res = await login(data).unwrap();

      if (res?.success) {
        const userData = res?.data?.user;
        setUser(userData);
        if (onSuccess && typeof onSuccess === "function") onSuccess();

        showToast({
          message: res?.message,
        });

        console.log(userData);

        router.push(
          `/${userData?.role.name === customer ? "customer" : "admin"}`
        );
      }
    },
    {
      handleError: "function",
      onError: (_, args, message) => {
        const setError = args?.setError as UseFormSetError<IAuthForm>;

        setError("root", {
          type: "manual",
          message: message,
        });
      },
    }
  );

  const loginWithGoogle = catchAsyncGeneral(async () => {
    const result = await loginGoogle();

    if (result.user) {
      const googleUser: IGoogleUser = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };

      const res = await socialLogin(googleUser).unwrap();

      if (res?.success) {
        const userData = res?.data?.user;
        setUser(userData);
        showToast({ message: res.message });

        router.push(
          `/${
            userData?.role.name === customer
              ? `customer?id=${userData?.id}`
              : "admin"
          }`
        );
      }
    }
  });

  const logout = catchAsyncGeneral(async () => {
    const res = await logoutTrigger().unwrap();

    if (res.status === "success") {
      setUser(null);
      router.replace("/");
      showToast({ message: "Signed Out", position: "top-center" });
    }
  });

  return {
    signupUser,
    isSignupUserLoading,
    isLocalLoginLoading,
    isSocialLoginLoading,
    isLogoutLoading,
    logout,
    localLogin,
    loginWithGoogle,
  };
};
