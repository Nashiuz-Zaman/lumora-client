"use client";

import React from "react";
import { FieldError } from "react-hook-form";
import { FileInputButton } from "./buttons";
import { Icon } from "@iconify/react";

interface IFileUploadFieldProps {
  label: string;
  text: string;
  icon: string;
  register: any;
  accept?: string;
  multiple?: boolean;
  files?: FileList;
  error?: FieldError;
  className?: string;
}

export const FileUploadField = ({
  label,
  text,
  icon,
  register,
  accept,
  multiple = false,
  files,
  error,
  className = "",
}: IFileUploadFieldProps) => {
  return (
    <div className={`space-y-2 w-full ${className}`}>
      {/* Field label */}
      <div className="flex items-center justify-between">
        <label className="block font-semibold">{label}</label>

        {/* Reusable button with children icon */}
        <FileInputButton
          text={text}
          accept={accept}
          multiple={multiple}
          {...register}
        >
          <Icon icon={icon} className="text-xl" />
        </FileInputButton>
      </div>

      {/* File previews */}
      {files && files.length > 0 && (
        <ul className="list-disc ml-4 text-sm text-neutral-500 space-y-1">
          {Array.from(files).map((file, idx) => (
            <li className="break-all" key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      {/* Error message */}
      {error?.message && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};
