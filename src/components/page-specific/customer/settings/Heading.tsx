interface IHeadingProps {
  text: string;
  className?: string;
}

export const Heading: React.FC<IHeadingProps> = ({ text, className = "" }) => {
  return (
    <h2
      className={`text py-4 text-center pl-1 font-semibold underline underline-offset-3 ${className}`}
    >
      {text}
    </h2>
  );
};
