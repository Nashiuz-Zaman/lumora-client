import React from "react";

interface IUnderDevelopmentProps {
  title?: string;
  className?: string;
}

export const UnderDev = ({
  title = "Feature",
  className = "",
}: IUnderDevelopmentProps) => {
  return (
    <div className={`h-full grid place-content-center ${className}`}>
      {/* Dynamic Title */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Under Development Message */}
      <p className="mt-4 text-lg text-muted-foreground text-center">
        This feature is under development.
      </p>
    </div>
  );
};
