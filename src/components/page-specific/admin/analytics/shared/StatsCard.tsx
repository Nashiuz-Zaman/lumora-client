"use client";

import { Icon } from "@iconify/react";
import { capitalize } from "lodash";

export interface IComparison {
  type: "increase" | "decrease" | "no change";
  change: number;
}

interface IStatsCardProps {
  label: string;
  value?: string | number;
  comparison?: IComparison;
  comparisonText?: string;
  negativeField?: boolean;
  isLoading?: boolean;
  changeRateShownBottom?: boolean;
  className?: string;
}

export const StatsCard = ({
  label,
  value,
  comparison,
  comparisonText,
  negativeField = false,
  isLoading = false,
  changeRateShownBottom = false,
  className = "",
}: IStatsCardProps) => {
  // Skeleton loading
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white py-6 px-4 flex flex-col shadow-sm animate-pulse">
        <div className="h-5 w-32 bg-neutral-200 rounded mb-5" />
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-16 bg-neutral-300 rounded-md" />
          <div className="h-4 w-10 bg-neutral-200 rounded-md" />
        </div>
        <div className="h-4 w-28 bg-neutral-200 rounded" />
      </div>
    );
  }

  const hasComparison = !!comparison?.type;

  const isIncrease = comparison?.type === "increase";
  const isDecrease = comparison?.type === "decrease";

  const changeColor = isIncrease
    ? negativeField
      ? "text-red-600"
      : "text-green-600"
    : isDecrease
    ? negativeField
      ? "text-green-600"
      : "text-red-600"
    : "text-neutral-400";

  const arrowIcon = isIncrease
    ? "solar:round-arrow-up-bold"
    : isDecrease
    ? "solar:round-arrow-down-bold"
    : "";

  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white py-6 px-4 flex flex-col select-none ${className}`}
    >
      <h3 className="text-lg font-medium mb-5">{label}</h3>

      <div
        className={`flex ${
          changeRateShownBottom ? "flex-col items-start" : "items-center"
        } gap-2 mb-2`}
      >
        <p className="text-3xl font-semibold">{value}</p>

        {hasComparison && comparison.type !== "no change" && (
          <div className={`flex items-center gap-1 ${changeColor}`}>
            {arrowIcon && (
              <Icon
                icon={arrowIcon}
                className={`text-xl ${changeColor}`}
                width={20}
                height={20}
              />
            )}
            <span className="text-sm font-medium">
              {comparison.change.toFixed(1)}%
            </span>
          </div>
        )}
      </div>

      <p className="text-neutral-400 text-sm">
        {capitalize(comparison?.type)} {comparisonText || "All time"}
      </p>
    </div>
  );
};
