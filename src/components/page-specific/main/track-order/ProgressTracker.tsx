"use client";

// ----------------------------- Imports -----------------------------
import { Icon } from "@iconify/react";
import React, { ReactNode } from "react";

// ----------------------------- Types -----------------------------
export interface IProgressStage {
  id: number;
  title: string;
  icon: string | ReactNode;
}

export interface IProgressTrackerProps {
  stages: IProgressStage[];
  activeId: number;
  className?: string;
}

// ----------------------------- Component -----------------------------
export const ProgressTracker = ({
  stages,
  activeId,
  className = "",
}: IProgressTrackerProps) => {
  const total = Math.max(1, stages?.length - 1);
  const progressPercent = (activeId / total) * 100;

  const renderIcon = (icon: string | ReactNode) =>
    typeof icon === "string" ? <Icon icon={icon} className="w-6 h-6" /> : icon;

  return (
    <div className={`${className}`}>
      {/* --------------------------------------------------------
          MAIN BAR (Horizontal on sm+)
      --------------------------------------------------------- */}
      <div className="hidden sm:block relative mb-10 w-[90%] mx-auto">
        <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* --------------------------------------------------------
            STAGE MARKERS
        --------------------------------------------------------- */}
        <div className="relative w-full mt-6" style={{ height: 90 }}>
          {stages?.map((stage, index) => {
            const left = (index / total) * 100;
            const isCompleted = stage.id <= activeId;

            return (
              <div
                key={stage.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${left}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* ✔️ Checkmark above icon IF completed */}

                <div
                  className={`mb-2 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center ${
                    isCompleted ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Icon icon="mdi:check" className="w-4 h-4 text-neutral-50" />
                </div>

                {/* icon + title */}
                <div className="flex flex-col items-center">
                  <div
                    className={
                      "w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600"
                    }
                  >
                    {renderIcon(stage.icon)}
                  </div>
                  <span className="text-sm mt-1 text-neutral-700 text-center">
                    {stage.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --------------------------------------------------------
          VERTICAL VERSION (mobile)
      --------------------------------------------------------- */}

      <div className="block sm:hidden w-full max-w-[12rem] mx-auto my-4">
        <div className="relative ml-6" style={{ height: stages.length * 90 }}>
          {/* Vertical bar */}
          <div className="absolute left-0 top-0 h-full w-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="w-full bg-linear-to-b from-primary to-secondary rounded-full transition-all duration-500"
              style={{
                height: `${progressPercent}%`,
              }}
            />
          </div>

          {/* STAGE MARKERS BASED ON PERCENTAGE */}
          {stages?.map((stage, index) => {
            const total = Math.max(1, stages.length - 1);
            const top = (index / total) * 100;
            const isCompleted = stage.id <= activeId;

            return (
              <div
                key={stage.id}
                className="absolute flex items-center gap-4"
                style={{
                  top: `${top}%`,
                  left: "24px",
                  transform: "translateY(-50%)",
                }}
              >
                {/* milestone dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isCompleted
                      ? "bg-green-600 border-green-600"
                      : "bg-white border-neutral-300"
                  }`}
                />

                <div className="flex flex-col">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 ${
                      isCompleted
                        ? "bg-green-50 text-green-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {renderIcon(stage.icon)}
                  </div>

                  <span className="text-sm text-neutral-700">
                    {stage.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
