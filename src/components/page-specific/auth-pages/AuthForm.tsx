"use client";

import {
  useForm,
  SubmitHandler,
  FormProvider,
  UseFormSetError,
} from "react-hook-form";
import Link from "next/link";
import { ButtonBtn, GoogleIcon, InputField } from "@/components/shared";
import { IUser } from "@/types";

// -------------------------
// TYPES
// -------------------------

interface IAuthFormBase {
  email: IUser["email"];
  password: string;
  mode: "signup" | "login"; // discriminant
}

interface IAuthFormSignup extends IAuthFormBase {
  mode: "signup";
  name: NonNullable<IUser["name"]>;
  confirmPassword: string;
}

interface IAuthFormLogin extends IAuthFormBase {
  mode: "login";
  name?: never;
  confirmPassword?: never;
}

export type TAuthForm = IAuthFormSignup | IAuthFormLogin;

// -------------------------
// COMPONENT PROPS
// -------------------------

interface IAuthFormProps {
  mode: "signup" | "login";
  onSubmit: (
    data: TAuthForm,
    setError: UseFormSetError<TAuthForm>
  ) => Promise<void>;
  onGoogleLogin?: () => void;
  isLoading?: boolean;
}

// -------------------------
// COMPONENT
// -------------------------

export const AuthForm = ({
  mode,
  onSubmit,
  onGoogleLogin,
  isLoading,
}: IAuthFormProps) => {
  const formInstance = useForm<TAuthForm>({
    defaultValues: {
      mode,
    } as TAuthForm,
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = formInstance;

  const passwordValue = watch("password");

  const handleFormSubmit: SubmitHandler<TAuthForm> = async (data) => {
    await onSubmit(data, setError);
  };

  return (
    <FormProvider {...formInstance}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-md space-y-6"
      >
        {/* 🔥 Hidden discriminant field (required for narrowing) */}
        <input type="hidden" value={mode} {...register("mode")} />

        <h2 className="text-3xl font-bold text-center">
          {mode === "signup" ? "Create an Account" : "Login"}
        </h2>

        {errors.root?.message && (
          <p className="text-red-500 text-center mt-2">{errors.root.message}</p>
        )}

        {/* Name (signup only) */}
        {mode === "signup" && (
          <InputField
            labelText="Name"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
            inputClassName="rounded-md"
          />
        )}

        {/* Email */}
        <InputField
          labelText="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
          inputClassName="rounded-md"
        />

        {/* Password */}
        <InputField
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

        {/* Confirm Password (signup only) */}
        {mode === "signup" && (
          <InputField
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

        {/* Auth Links */}
        {mode === "signup" ? (
          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-600 font-medium">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm text-neutral-500">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-purple-600 font-medium">
              Create one
            </Link>
          </p>
        )}

        {/* Google OAuth (signup only) */}
        {mode === "login" && (
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
              continue with Google
            </ButtonBtn>
          </>
        )}
      </form>
    </FormProvider>
  );
};
