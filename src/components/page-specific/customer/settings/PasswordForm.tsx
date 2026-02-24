"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

// Components
import { InputField, ButtonBtn } from "@/components/shared";
import { Heading } from "./Heading";

// Utils
import { showToast, catchAsyncGeneral } from "@/utils";

// Redux
import { useUpdateCustomerPasswordFromSettingsMutation } from "@/libs/redux/apiSlices/customer/customerApiSlice";

interface IPasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordForm = () => {
  const [updateCustomerPasswordFromSettings, { isLoading }] =
    useUpdateCustomerPasswordFromSettingsMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<IPasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = catchAsyncGeneral(
    async (args) => {
      const data = args?.data as IPasswordFormData;

      const result = await updateCustomerPasswordFromSettings({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (result?.success) {
        showToast({ message: result.message });
        reset();
      }
    },
    {
      handleError: "function",
      onError(_, __, message) {
        setError("root", { message });
      },
    }
  );

  return (
    <div className="max-w-xl shadow-md rounded-2xl border border-neutral-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Icon icon="mdi:lock-outline" className="text-xl text-primary" />
        <Heading text="Change Password" />
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit({ data }))}
        className="space-y-5"
      >
        <div className="grid gap-4">
          <InputField
            labelText="Current Password"
            type="password"
            passwordField
            placeholder="Enter current password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            error={errors.currentPassword?.message}
            inputClassName="rounded-md border border-neutral-200 placeholder:text-neutral-500 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            labelTextClassName="text-[0.9rem] text-neutral-700 font-medium"
          />

          <InputField
            labelText="New Password"
            type="password"
            passwordField
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
            })}
            error={errors.newPassword?.message}
            inputClassName="rounded-md border border-neutral-200 placeholder:text-neutral-500 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            labelTextClassName="text-[0.9rem] text-neutral-700 font-medium"
          />

          <InputField
            labelText="Confirm Password"
            type="password"
            passwordField
            placeholder="Re-enter new password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
            inputClassName="rounded-md border border-neutral-200 placeholder:text-neutral-500 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            labelTextClassName="text-[0.9rem] text-neutral-700 font-medium"
          />
        </div>

        <ButtonBtn
          type="submit"
          isLoading={isLoading}
          className="w-full md:w-auto !text-sm tracking-wide bg-primary text-neutral-50 hover:bg-primary/90 !rounded-full px-6 py-2.5 transition-all duration-200 uppercase"
        >
          Change Password
        </ButtonBtn>
      </form>
    </div>
  );
};
