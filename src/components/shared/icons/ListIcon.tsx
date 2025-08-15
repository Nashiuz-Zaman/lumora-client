const ListIcon = ({ className = "" }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1em] aspect-square"
        viewBox="0 0 36 36"
      >
        <path
          fill="currentColor"
          d="M28 2H8a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M13 26h-2v-2h2Zm0-4h-2v-2h2Zm0-4h-2v-2h2Zm0-4h-2v-2h2Zm0-4h-2V8h2Zm12 16H15v-2h10Zm0-4H15v-2h10Zm0-4H15v-2h10Zm0-4H15v-2h10Zm0-4H15V8h10Z"
          className="clr-i-solid clr-i-solid-path-1"
        ></path>
        <path fill="none" d="M0 0h36v36H0z"></path>
      </svg>
    </div>
  );
};

export default ListIcon;
