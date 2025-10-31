"use client";

interface MetricCardProps {
  title: string;
  value?: number;
  isLoading?: boolean;
  formatter?: (value: number) => string;
  gradientText?: boolean;
}

export const MetricCard = ({
  title,
  value = 0,
  isLoading,
  formatter,
  gradientText,
}: MetricCardProps) => {
  return (
    <div className="selection:bg-transparent">
      <h2 className="text-lg text-neutral-400 mb-3">{title}</h2>

      <span
        className={`text-3xl inline-block font-medium ${
          gradientText
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-300 bg-clip-text text-transparent"
            : ""
        }`}
      >
        {isLoading ? "Loading..." : formatter ? formatter(value) : value}
      </span>
    </div>
  );
};
