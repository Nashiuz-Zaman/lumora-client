export const DashboardPageHeading = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h2 className={`font-semibold text-3xl capitalize ${className}`}>
      {text}
    </h2>
  );
};
