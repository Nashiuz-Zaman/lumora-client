"use client";

type TErrorMessageProps = {
  text?: string;
  className?: string;
  centered?: boolean;
};

export const ErrorMessage = ({
  text = "Something went wrong",
  className = "",
  centered = false,
}: TErrorMessageProps) => {
  return (
    <p
      className={`text-red-600 ${
        centered ? "absolute xy-center" : "my-4"
      } text-center text-sm ${className}`}
    >
      {text}
    </p>
  );
};
