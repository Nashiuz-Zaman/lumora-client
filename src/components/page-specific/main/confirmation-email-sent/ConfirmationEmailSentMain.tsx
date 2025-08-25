"use client";

import { ButtonBtn, IcfyIcon } from "@/components/shared";
import { useResendConfirmationEmailMutation } from "@/libs/redux/apiSlices/email/emailApiSlice";
import { catchAsyncGeneral } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const defaultCooldownTime = 5; // minutes
export const cooldownStorageName = "resend_email_cooldown";

export const ConfirmationEmailSentMain = () => {
  const params = useSearchParams();
  const email = params?.get("email");
  const [isLoading, setIsLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // typed timeout
  const [resendConfirmationEmail] = useResendConfirmationEmailMutation();

  const startCooldown = (expiresAt: number) => {
    setIsCooldown(true);
    localStorage.setItem(cooldownStorageName, expiresAt.toString());

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsCooldown(false);
      localStorage.removeItem(cooldownStorageName);
      timeoutRef.current = null;
    }, expiresAt - Date.now());
  };

  useEffect(() => {
    if (!email) {
      router.push("/");
      return;
    }

    const savedTime = localStorage.getItem(cooldownStorageName);

    if (!savedTime) {
      const cooldownUntil = Date.now() + defaultCooldownTime * 60 * 1000;
      startCooldown(cooldownUntil);
    } else if (+savedTime > Date.now()) {
      startCooldown(+savedTime);
    } else {
      localStorage.removeItem(cooldownStorageName);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [email, router]);

  const resendEmail = catchAsyncGeneral(
    async () => {
      setIsLoading(true);

      const { data } = await resendConfirmationEmail({
        email,
      }).unwrap();

      if (data?.status === "success") {
        const cooldownUntil = Date.now() + defaultCooldownTime * 60 * 1000;
        startCooldown(cooldownUntil);
      }
    },
    {
      onFinally: () => {
        setIsLoading(false);
      },
    }
  );
  if (!email) return null;

  return (
    <section className="w-[60%] p-10 text-center bg-white">
      <IcfyIcon
        className="text-green-500 text-7xl mx-auto mb-6"
        icon="lets-icons:check-fill"
      />

      <h2 className="text-2xl font-semibold mb-4">Confirmation Email Sent</h2>

      <p className="text-neutral-600 mb-6 leading-relaxed">
        We’ve sent a confirmation email to{" "}
        <span className="font-medium text-primary">{email}</span>. <br />
        Please check your inbox and spam folders to verify your account.
      </p>

      {isCooldown && (
        <p className="mb-6 text-sm text-yellow-600 font-medium">
          You can request again after {defaultCooldownTime} minutes.
        </p>
      )}

      <ButtonBtn
        isLoading={isLoading}
        onClick={resendEmail}
        className="!primaryClasses !rounded-full mx-auto"
        isDisabled={isCooldown}
      >
        Resend Email
      </ButtonBtn>
    </section>
  );
};
