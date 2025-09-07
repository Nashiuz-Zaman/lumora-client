"use client";

type TNoDataProps = {
  className?: string;
  text?: string;
  centered?: boolean;
};

export const NoData = ({
  className = "",
  text = "No Data",
  centered = false,
}: TNoDataProps) => {
  return (
    <p
      className={`text-neutral-400 ${
        centered ? "absolute xy-center" : "my-24"
      } text-center ${className}`}
    >
      {text}
    </p>
  );
};
