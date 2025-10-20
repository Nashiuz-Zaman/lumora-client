"use client";

import { OrderStatus, TOrderStatusValue } from "@/constants";
import { Icon } from "@iconify/react";

interface IProgressTrackerProps {
  status?: TOrderStatusValue;
  className?: string;
}

export const ProgressTracker = ({
  status = OrderStatus.Pending,
  className = "",
}: IProgressTrackerProps) => {
  const isCancelled = status === OrderStatus.Cancelled;
  const isReturned = status === OrderStatus.Returned;

  // Early return for Cancelled / Returned
  if (isCancelled || isReturned) {
    const label = isCancelled ? "Order Cancelled" : "Order Returned";

    return (
      <div
        className={`w-full flex justify-center items-center gap-2 bg-neutral-50 text-neutral-400 py-16`}
      >
        <span className="text-2xl font-medium">{label}</span>
      </div>
    );
  }

  // Normal progress states
  const stages = [
    {
      key: OrderStatus.Pending,
      label: "Pending",
      icon: "solar:clock-circle-bold",
    },
    { key: OrderStatus.Confirmed, label: "Confirmed", icon: "mdi:marker-tick" },
    {
      key: OrderStatus.Shipped,
      label: "Shipped",
      icon: "ic:baseline-local-shipping",
    },
    {
      key: OrderStatus.Delivered,
      label: "Delivered",
      icon: "mdi:package-variant-closed-delivered",
    },
  ];

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Progress bar line */}
      <div className="relative w-full flex justify-between items-center max-w-3xl">
        {/* Background bar */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-neutral-300 -translate-y-1/2" />

        {/* Active progress */}
        <div
          className="absolute top-1/2 left-0 h-[3px] bg-secondary -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${(status / (stages.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {stages.map((s) => {
          const isActive = status >= s.key;
          return (
            <div
              key={s.key}
              className="flex flex-col items-center text-center z-10 w-[25%]"
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 ${
                  isActive
                    ? "bg-secondary border-secondary"
                    : "bg-white border-neutral-300"
                }`}
              >
                {isActive && status === s.key ? (
                  <Icon
                    icon="solar:check-bold"
                    className="w-3.5 h-3.5 text-white"
                  />
                ) : null}
              </div>
              <Icon
                icon={s.icon}
                className={`w-5 h-5 sm:w-6 sm:h-6 mt-3 ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              />
              <p
                className={`text-xs sm:text-sm font-medium mt-1 ${
                  isActive ? "text-textDark" : "text-neutral-400"
                }`}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
