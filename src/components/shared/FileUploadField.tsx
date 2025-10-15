"use client";

import React from "react";
import { FieldError } from "react-hook-form";
import { FileInputButton } from "./buttons";
import { Icon } from "@iconify/react";

interface IFileUploadFieldProps {
  labelText: string;
  buttonText: string;
  icon: string;
  accept?: string;
  multiple?: boolean;
  files?: FileList;
  error?: FieldError;
  className?: string;
  [key: string]: any;
}

export const FileUploadField = ({
  labelText,
  buttonText,
  icon,
  accept,
  multiple = false,
  files,
  error,
  className = "",
  ...props
}: IFileUploadFieldProps) => {
  return (
    <div className={`space-y-2 w-full ${className}`}>
      {/* Field label */}
      <div className="flex items-center justify-between">
        <label className="block font-semibold">{labelText}</label>

        {/* Reusable button with children icon */}
        <FileInputButton
          buttonText={buttonText}
          accept={accept}
          multiple={multiple}
          {...props}
        >
          <Icon icon={icon} className="text-xl" />
        </FileInputButton>
      </div>

      {/* File previews */}
      {files && files.length > 0 && (
        <ul className="list-disc ml-4 text-sm text-neutral-500 space-y-1">
          {Array.from(files).map((file, idx) => (
            <li className="break-all" key={idx}>
              {file.name}
            </li>
          ))}
        </ul>
      )}

      {/* Error message */}
      {error?.message && (
        <p className="text-red-600 text-sm">* {error.message}</p>
      )}
    </div>
  );
};
