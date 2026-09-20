"use client";

import React, { ReactNode } from "react";

interface IFileInputButtonProps {
  buttonText: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export const FileInputButton = ({
  buttonText,
  accept,
  multiple = false,
  className = "",
  children,
  ...props
}: IFileInputButtonProps) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer px-4 py-2 border border-zinc-200 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition w-fit ${className}`}
    >
      {children}
      <span className="text-sm">{buttonText}</span>

      <input
        type="file"
        multiple={multiple}
        accept={accept}
        className="hidden"
        {...props}
      />
    </label>
  );
};
