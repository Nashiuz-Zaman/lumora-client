"use client";

import { IcfyIcon } from "./IcfyIcon";

type IDataLoadingSpinnerProps = {
  className?: string;
};

export const DataLoadingSpinner = ({
  className = "",
}: IDataLoadingSpinnerProps) => {
  return (
    <div
      className={`absolute w-full h-full top-0 left-0 flex items-center justify-center z-[1] py-16 text-primary text-6xl ${className}`}
    >
      <IcfyIcon
        className="[color:inherit] [font-size:inherit]"
        icon="line-md:loading-twotone-loop"
      />
    </div>
  );
};
