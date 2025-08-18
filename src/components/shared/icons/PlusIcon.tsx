export const PlusIcon = ({ className = "" }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1em] aspect-square"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
        ></path>
      </svg>
    </div>
  );
};
