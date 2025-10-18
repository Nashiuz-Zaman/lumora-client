"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface IProgressTrackerProps {
  stage?: number;
  className?: string;
}

export const ProgressTracker = ({
  stage = 1,
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

  const renderStep = (step: number, label: string, iconName: string) => (
    <div className="flex flex-col items-center relative z-50 translate-x-0">
      <div
        className={`${progressCircleClasses} ${
          stage >= step ? activeClasses : inActiveClasses
        }`}
      >
        {stage === step && checkmarkIcon}
      </div>

      <div
        className={`flex flex-col items-center ${
          stage >= step ? "opacity-100" : "opacity-30"
        }`}
      >
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
          stage >= step ? "opacity-100" : "opacity-30"
        }`}
      />

      <div className={progressMainClasses}>
        <div
          className={`${progressCircleClasses} ${
            stage >= step ? activeClasses : inActiveClasses
          }`}
        >
          {stage === step && checkmarkIcon}
        </div>

        <div
          className={`flex flex-col items-center ${
            stage >= step ? "opacity-100" : "opacity-30"
          }`}
        >
          <Icon icon={iconName} className={iconClass} />
          <p className={stageTextClasses}>{label}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full flex md:ml-4 lg:ml-8 ${className}`}>
      {/* Stage 1: Quotation Sent */}
      {renderStep(1, "Quotation Sent", "solar:document-text-bold")}

      {/* Stage 2: Confirmed */}
      {renderProgressStep(2, "Confirmed", "mdi:marker-tick", 40)}

      {/* Stage 3: On The Road */}
      {renderProgressStep(3, "Shipped", "ic:baseline-local-shipping", 30)}

      {/* Stage 4: Delivered */}
      {renderProgressStep(
        4,
        "Delivered",
        "mdi:package-variant-closed-delivered",
        20
      )}
    </div>
  );
};
