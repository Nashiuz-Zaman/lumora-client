export const CenterContainer = ({
  children,
  paddingSide = "both",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  paddingSide?: "left" | "right" | "both";
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={`w-full ${className}`} {...props}>
      <div
        className={`max-w-400 w-full mx-auto ${
          paddingSide === "left"
            ? "pl-4 md:pl-[1.7rem] 2xl:pl-12"
            : paddingSide === "right"
            ? "pr-4 md:pr-[1.7rem] 2xl:pr-12"
            : "px-4 md:px-[1.7rem] 2xl:px-12"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
