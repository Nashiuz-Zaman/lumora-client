"use client";

import { ChangeEvent } from "react";
import { Icon } from "@iconify/react";

interface ITextAreaProps {
  labelText?: string;
  placeholder?: string;
  labelTextClassName?: string;
  inputClassName?: string;
  className?: string;
  labelContainerClassName?: string;
  error?: string;
  icon?: string | null;
  iconClassName?: string;
  invertIconPosition?: boolean;
  readOnly?: boolean;
  value?: string; // controlled
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]: unknown; // RHF register props
}

export const TextArea = ({
  labelText,
  placeholder = "No placeholder provided",
  labelTextClassName = "",
  inputClassName = "",
  className = "",
  labelContainerClassName = "",
  icon = null,
  iconClassName = "",
  invertIconPosition = false,
  error,
  ...props
}: ITextAreaProps) => {
  return (
    <label
      className={`block w-full !rounded-[inherit] [color:inherit] ${className}`}
    >
      {labelText && (
        <div className={`text-inherit ${labelContainerClassName}`}>
          <p
            className={`capitalize mb-2 [color:inherit] ${labelTextClassName}`}
          >
            {labelText}
          </p>
        </div>
      )}

      <div
        className={`bg-white border border-neutral-200 p-2 w-full lg:px-4 lg:py-3 ${
          icon
            ? `grid ${
                invertIconPosition
                  ? "grid-cols-[auto_1fr]"
                  : "grid-cols-[1fr_auto]"
              }`
            : "block"
        } ${inputClassName}`}
      >
        <textarea
          placeholder={placeholder}
          className={`block [color:inherit] [font-size:inherit] [background-color:inherit] [line-height:inherit] w-full focus:outline-none ${
            invertIconPosition ? "order-2" : "order-1"
          }`}
          {...props}
        />
        {icon && (
          <Icon
            icon={icon}
            className={`block my-1 mx-3 w-max text-inherit ${
              invertIconPosition ? "order-1" : "order-2"
            } ${iconClassName}`}
          />
        )}
      </div>

      {error && <p className={`text-red-600 text-sm mt-2`}>* {error}</p>}
    </label>
  );
};
