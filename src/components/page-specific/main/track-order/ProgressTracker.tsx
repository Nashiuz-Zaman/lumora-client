"use client";

import { Icon } from "@iconify/react";

export const OrderStatus = Object.freeze({
  Pending: 0,
  Confirmed: 1,
  Shipped: 2,
  Delivered: 3,
  Cancelled: 4,
  Returned: 5,
} as const);

interface IProgressTrackerProps {
  stage?: number;
  className?: string;
}

export const ProgressTracker = ({
  stage = OrderStatus.Pending,
  className = "",
}: IProgressTrackerProps) => {
  const stageTextClasses = "text-2xs lg:text-sm font-medium text-textDark";
  const stageMainClasses = "w-[27%] relative -translate-x-10";
  const progressBarClasses = "h-2 w-full mt-2 bg-secondary";
  const progressCircleClasses =
    "w-6 aspect-square flex justify-center items-center rounded-full mb-6 border-2";
  const activeClasses = "bg-secondary border-white";
  const inActiveClasses = "bg-white border-secondary";
  const progressMainClasses =
    "flex flex-col items-center w-max absolute top-0 right-0 translate-x-1/2";
  const iconClass = "w-5 h-5 lg:w-8 lg:h-8 mb-3";

  const checkmarkIcon = (
    <Icon icon="solar:check-bold" className="w-3 h-3 text-white" />
  );

  const isCancelled = stage === OrderStatus.Cancelled;
  const isReturned = stage === OrderStatus.Returned;

  const getOpacity = (step: number) =>
    stage >= step && stage < OrderStatus.Cancelled
      ? "opacity-100"
      : "opacity-30";

  const renderStep = (step: number, label: string, iconName: string) => (
    <div className="flex flex-col items-center relative z-50 translate-x-0">
      <div
        className={`${progressCircleClasses} ${
          stage >= step && stage < OrderStatus.Cancelled
            ? activeClasses
            : inActiveClasses
        }`}
      >
        {stage === step && stage < OrderStatus.Cancelled && checkmarkIcon}
      </div>

      <div className={`flex flex-col items-center ${getOpacity(step)}`}>
        <Icon icon={iconName} className={iconClass} />
        <p className={stageTextClasses}>{label}</p>
      </div>
    </div>
  );

  const renderProgressStep = (
    step: number,
    label: string,
    iconName: string,
    zIndex: number
  ) => (
    <div className={`${stageMainClasses} z-[${zIndex}]`}>
      <div
        className={`${progressBarClasses} ${
          stage >= step && stage < OrderStatus.Cancelled
            ? "opacity-100"
            : "opacity-30"
        }`}
      />

      <div className={progressMainClasses}>
        <div
          className={`${progressCircleClasses} ${
            stage >= step && stage < OrderStatus.Cancelled
              ? activeClasses
              : inActiveClasses
          }`}
        >
          {stage === step && stage < OrderStatus.Cancelled && checkmarkIcon}
        </div>

        <div className={`flex flex-col items-center ${getOpacity(step)}`}>
          <Icon icon={iconName} className={iconClass} />
          <p className={stageTextClasses}>{label}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`w-full flex md:ml-4 lg:ml-8 relative ${
        isCancelled || isReturned ? "opacity-50" : ""
      } ${className}`}
    >
      {/* Stage 0: Pending */}
      {renderStep(OrderStatus.Pending, "Pending", "solar:clock-circle-bold")}

      {/* Stage 1: Confirmed */}
      {renderProgressStep(
        OrderStatus.Confirmed,
        "Confirmed",
        "mdi:marker-tick",
        40
      )}

      {/* Stage 2: Shipped */}
      {renderProgressStep(
        OrderStatus.Shipped,
        "Shipped",
        "ic:baseline-local-shipping",
        30
      )}

      {/* Stage 3: Delivered */}
      {renderProgressStep(
        OrderStatus.Delivered,
        "Delivered",
        "mdi:package-variant-closed-delivered",
        20
      )}

      {/* Special cases */}
      {isCancelled && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-red-500">
          <Icon icon="mdi:cancel-bold" className="w-5 h-5" />
          <span className="text-sm font-medium">Order Cancelled</span>
        </div>
      )}

      {isReturned && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-500">
          <Icon icon="mdi:package-variant-return" className="w-5 h-5" />
          <span className="text-sm font-medium">Order Returned</span>
        </div>
      )}
    </div>
  );
};
