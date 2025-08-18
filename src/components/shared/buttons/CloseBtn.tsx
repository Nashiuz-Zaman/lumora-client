"use client";

import { CloseIcon } from "../icons";

export const CloseBtn = ({
  onClick,
  modifyClasses = "",
  title = "Close",
}: {
  onClick?: () => void;
  modifyClasses?: string;
  title?: string;
}) => {
  return (
    <button
      type="button"
      title={title}
      aria-label="Close button"
      className={`ml-auto w-max block text-3xl text-textPrimary ${modifyClasses}`}
      onClick={onClick}
    >
      <CloseIcon />
    </button>
  );
};
