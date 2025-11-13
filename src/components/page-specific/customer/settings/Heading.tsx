interface IHeadingProps {
  text: string;
  className?: string;
}

export const Heading: React.FC<IHeadingProps> = ({ text, className = "" }) => {
  return (
    <h2
      className={`text-sm py-4 text-center pl-2 font-medium uppercase ${className}`}
    >
      {text}
    </h2>
  );
};
