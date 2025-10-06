"use client";

import {
  InnerContainer,
  IcfyIcon,
  LinkBtn,
  RedirectCountdown,
} from "@/components/shared";

import { getQueryParamsFromSearchParams } from "@/utils/getQueryParamsFromSearchParams";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const VALID_STATUSES = ["success", "fail", "cancel"] as const;
type PaymentStatus = (typeof VALID_STATUSES)[number];

const PaymentResultPageMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { status, orderId } = getQueryParamsFromSearchParams(searchParams, [
    "status",
    "orderId",
  ]) as { status?: string; orderId?: string };

  // Redirect if missing or invalid params
  useEffect(() => {
    if (
      !status ||
      !orderId ||
      !VALID_STATUSES.includes(status as PaymentStatus)
    ) {
      router.replace("/");
    }
  }, [status, orderId, router]);

  if (!status || !orderId || !VALID_STATUSES.includes(status as PaymentStatus))
    return null;

  const descriptions: Record<PaymentStatus, string> = {
    success: "Your payment was successful and your order has been placed.",
    fail: "Unfortunately, the payment did not go through.",
    cancel: "You cancelled the payment before it was completed.",
  };

  const icons: Record<PaymentStatus, { name: string; color: string }> = {
    success: {
      name: "clarity:success-standard-solid",
      color: "text-green-500",
    },
    fail: { name: "ic:round-error", color: "text-red-500" },
    cancel: { name: "mdi:cancel", color: "text-red-500" },
  };

  const typedStatus = status as PaymentStatus;

  return (
    <div className="h-full grid place-content-center">
      <InnerContainer>
        <div className="border border-neutral-200 shadow-md rounded-2xl p-10 bg-white flex flex-col items-center gap-6 max-w-lg mx-auto">
          <div className="text-center space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <IcfyIcon
                icon={icons[typedStatus].name}
                className={`text-4xl ${icons[typedStatus].color}`}
              />
              <p className="text-2xl font-semibold capitalize">
                Payment{" "}
                {typedStatus === "success"
                  ? "Successful"
                  : typedStatus === "fail"
                  ? "Failed"
                  : "Cancelled"}
              </p>
            </div>

            <p className="text-lg !mb-3">{descriptions[typedStatus]}</p>

            <p className="text-3xl font-bold">
              Order: <span className="font-normal">{orderId}</span>
            </p>
          </div>

          {typedStatus === "success" && (
            <LinkBtn href="/track-order" className="!primaryClasses">
              Track your Order
            </LinkBtn>
          )}

          {typedStatus === "fail" && (
            <LinkBtn
              href={`/checkout`}
              className="!primaryClasses !rounded-full"
            >
              Try Again
            </LinkBtn>
          )}

          {typedStatus === "cancel" && (
            <RedirectCountdown
              href="/cart"
              after={5000}
              text="Redirecting To Cart"
              modifyClasses="text-center mt-2 text-muted-foreground"
            />
          )}
        </div>
      </InnerContainer>
    </div>
  );
};

export default PaymentResultPageMain;
