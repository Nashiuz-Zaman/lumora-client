"use client";

import { isValidElement, ReactNode, useState } from "react";
import { Icon } from "@iconify/react";

type TInputFieldProps = {
  labelText?: string | ReactNode;
  type?: string;
  placeholder?: string;
  passwordField?: boolean;
  labelTextClassName?: string;
  inputClassName?: string;
  className?: string;
  labelContainerClassName?: string;
  icon?: string | ReactNode;
  iconClassName?: string;
  passwordShowIconClassName?: string;
  passwordShowIconBoxClassName?: string;
  placeholderClassName?: string;
  errorClassName?: string;
  invertIconPosition?: boolean;
  error?: string;
  // RHF props injected via Controller or register
  [key: string]: unknown;
};

export const InputField = ({
  labelText,
  type = "text",
  placeholder = "No placeholder provided",
  labelTextClassName = "",
  inputClassName = "",
  className = "",
  labelContainerClassName = "",
  icon,
  iconClassName = "",
  passwordShowIconClassName = "",
  passwordShowIconBoxClassName = "",
  placeholderClassName = "",
  errorClassName = "",
  passwordField = false,
  invertIconPosition = false,
  error,
  ...props
}: TInputFieldProps) => {
  const [passHidden, setPassHidden] = useState(true);

  const renderIcon = () => {
    if (!icon) return null;

    // If string → iconify style
    if (typeof icon === "string") {
      return (
        <Icon
          icon={icon}
          className={`block w-max text-inherit ${
            invertIconPosition ? "order-1 mr-3" : "order-2"
          } ${iconClassName}`}
        />
      );
    }

    // If React element, render component
    if (isValidElement(icon)) {
      return (
        <span
          className={`block w-max text-inherit ${
            invertIconPosition ? "order-1 mr-3" : "order-2"
          } ${iconClassName}`}
        >
          {icon}
        </span>
      );
    }

    return null;
  };

  return (
    <label
      className={`block w-full !rounded-[inherit] [color:inherit] ${className}`}
    >
      {(labelText || passwordField) && (
        <div
          className={`${
            labelText && passwordField ? "flex items-center" : ""
          } text-inherit ${labelContainerClassName}`}
        >
          {labelText && (
            <p
              className={`[color:inherit] mb-2 capitalize ${labelTextClassName}`}
            >
              {labelText}
            </p>
          )}

          {passwordField && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setPassHidden((prev) => !prev);
              }}
              className={`flex cursor-pointer items-center gap-1 ml-auto mr-1 text-inherit ${passwordShowIconBoxClassName}`}
            >
              <Icon
                icon={passHidden ? "mdi:eye" : "el:eye-close"}
                className={passwordShowIconClassName}
              />
              <span className="block">{passHidden ? "Show" : "Hide"}</span>
            </button>
          )}
        </div>
      )}

      <div
        className={`bg-white border border-neutral-200  items-center w-full px-4 py-3 ${
          icon
            ? `grid ${
                invertIconPosition
                  ? "grid-cols-[auto_1fr]"
                  : "grid-cols-[1fr_auto]"
              }`
            : "block"
        } ${inputClassName}`}
      >
        <input
          type={passwordField ? (passHidden ? "password" : "text") : type}
          placeholder={placeholder}
          className={`block [color:inherit] [fontSize:inherit] [background-color:inherit] [lineHeight:inherit] w-full focus:outline-none ${
            invertIconPosition ? "order-2" : "order-1"
          } ${placeholderClassName}`}
          {...props}
        />
        {renderIcon()}
      </div>

      {error && (
        <p className={`text-red-600 text-sm mt-2 ${errorClassName}`}>
          * {error}
        </p>
      )}
    </label>
  );
};
