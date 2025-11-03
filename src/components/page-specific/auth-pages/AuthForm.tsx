"use client";

import {
  useForm,
  SubmitHandler,
  FormProvider,
  UseFormSetError,
} from "react-hook-form";
import Link from "next/link";
import { ButtonBtn, GoogleIcon, Inputfield } from "@/components/shared";

export interface IAuthForm {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface IAuthFormProps {
  mode: "signup" | "login";
  onSubmit: (
    data: IAuthForm,
    setError: UseFormSetError<IAuthForm>
  ) => Promise<void>;
  onGoogleLogin?: () => void;
  isLoading?: boolean;
}

export const AuthForm = ({
  mode,
  onSubmit,
  onGoogleLogin,
  isLoading,
}: IAuthFormProps) => {
  const formInstance = useForm<IAuthForm>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = formInstance;

  const passwordValue = watch("password");

  const handleFormSubmit: SubmitHandler<IAuthForm> = async (data) => {
    await onSubmit(data, setError);
  };

  return (
    <FormProvider {...formInstance}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">
          {mode === "signup" ? "Create an Account" : "Login"}
        </h2>

        {/* Root-level error */}
        {errors.root?.message && (
          <p className="text-red-500 text-center mt-2">{errors.root.message}</p>
        )}

        {mode === "signup" && (
          <Inputfield
            labelText="Name"
            placeholder="Enter your full name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
            inputClassName="rounded-md"
          />
        )}

        <Inputfield
          labelText="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
          inputClassName="rounded-md"
        />

        <Inputfield
          passwordField={true}
          labelText="Password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
          error={errors.password?.message}
          inputClassName="rounded-md"
        />

        {mode === "signup" && (
          <Inputfield
            passwordField={true}
            labelText="Confirm Password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
            inputClassName="rounded-md"
          />
        )}

        <ButtonBtn
          type="submit"
          isLoading={isLoading}
          className="!primaryClasses !w-full !rounded-full"
        >
          {mode === "signup" ? "Sign Up" : "Login"}
        </ButtonBtn>

        {mode === "signup" && (
          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-600 font-medium">
              Login
            </Link>
          </p>
        )}

        {mode === "login" && (
          <>
            <p className="text-center text-sm text-neutral-500">
              Don’t have an account?{" "}
              <Link href="/auth/signup" className="text-purple-600 font-medium">
                Create one
              </Link>
            </p>
          </>
        )}

        {mode === "signup" && (
          <>
            <div className="flex items-center justify-center gap-2 text-neutral-400">
              <span>or</span>
            </div>

            <ButtonBtn
              type="button"
              onClick={onGoogleLogin}
              className="flex items-center justify-center gap-2 !rounded-full !w-full !whiteGrayClasses !font-medium"
            >
              <GoogleIcon />
              Sign up with Google
            </ButtonBtn>
          </>
        )}
      </form>
    </FormProvider>
  );
};
