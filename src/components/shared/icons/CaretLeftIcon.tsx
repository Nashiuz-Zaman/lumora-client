export const CaretLeftIcon = ({ className = "" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1em] aspect-square"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M71.51 119.51l80-80a12 12 0 0 1 17 17L97 128l71.51 71.51a12 12 0 1 1-17 17l-80-80a12 12 0 0 1 0-16z"
        ></path>
      </svg>
    </div>
  );
};
