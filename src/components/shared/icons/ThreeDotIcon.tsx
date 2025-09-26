export const ThreeDotIcon = ({ className = "" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1em] aspect-square"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3"
        ></path>
      </svg>
    </div>
  );
};
