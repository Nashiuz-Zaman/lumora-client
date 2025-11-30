"use client";

import { IcfyIcon } from "./IcfyIcon";

type ILoadingSpinnerProps = {
  className?: string;
  centered?: boolean;
};

export const LoadingSpinner = ({
  className = "",
  centered = false,
}: ILoadingSpinnerProps) => {
  return (
    <div
      className={`${
        centered ? "absolute xy-center" : "my-24"
      } flex items-center justify-center text-primary text-6xl ${className}`}
    >
      <IcfyIcon
        className="text-inherit [font-size:inherit]"
        icon="line-md:loading-twotone-loop"
      />
    </div>
  );
};
