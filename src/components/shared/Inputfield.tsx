"use client";

import { useState, ChangeEvent } from "react";
import { Icon } from "@iconify/react";

type TInputfieldProps = {
  labelText?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  passwordField?: boolean;
  labelTextModifyClasses?: string;
  inputModifyClasses?: string;
  modifyClasses?: string;
  labelContainerModifyClasses?: string;
  icon?: string | null;
  iconModifyClasses?: string;
  passwordShowIconModifyClasses?: string;
  passwordShowIconBoxModifyClasses?: string;
  placeholderModifyClasses?: string;
  errorModifyclasses?: string;
  isRequired?: boolean;
  defaultValue?: string | number;
  invertIconPosition?: boolean;
  value?: string | number;
  readOnly?: boolean;
  min?: number;
  max?: number;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Inputfield = ({
  labelText,
  type = "text",
  placeholder = "No placeholder provided",
  name = "",
  passwordField = false,
  labelTextModifyClasses = "",
  inputModifyClasses = "",
  modifyClasses = "",
  labelContainerModifyClasses = "",
  icon = null,
  iconModifyClasses = "",
  passwordShowIconModifyClasses = "",
  passwordShowIconBoxModifyClasses = "",
  placeholderModifyClasses = "",
  errorModifyclasses = "",
  isRequired = true,
  defaultValue,
  invertIconPosition = false,
  value,
  readOnly = false,
  min,
  max,
  error,
  onChange = () => {},
}: TInputfieldProps) => {
  const [passHidden, setPassHidden] = useState(true);

  return (
    <label
      className={`block w-full !rounded-[inherit] [color:inherit] ${modifyClasses}`}
    >
      {(labelText || passwordField) && (
        <div
          className={`${
            labelText && passwordField ? "flex items-center" : ""
          } text-inherit ${labelContainerModifyClasses}`}
        >
          {labelText && (
            <p
              className={`[color:inherit] mb-2 capitalize ${labelTextModifyClasses}`}
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
              className={`flex items-center gap-1 ml-auto mr-1 text-inherit ${passwordShowIconBoxModifyClasses}`}
            >
              <Icon
                icon={passHidden ? "mdi:eye" : "el:eye-close"}
                className={passwordShowIconModifyClasses}
              />
              <span className="block">{passHidden ? "Show" : "Hide"}</span>
            </button>
          )}
        </div>
      )}

      <div
        className={`bg-white border border-neutral-200 p-2 items-center w-full lg:px-4 lg:py-3 ${
          icon
            ? `grid ${
                invertIconPosition
                  ? "grid-cols-[auto_1fr]"
                  : "grid-cols-[1fr_auto]"
              }`
            : "block"
        } ${inputModifyClasses}`}
      >
        <input
          {...(type === "number"
            ? { ...(min != null && { min }), ...(max != null && { max }) }
            : {})}
          {...(type === "number" ? { step: 0.01 } : {})}
          readOnly={readOnly}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={`block [color:inherit] [fontSize:inherit] [background-color:inherit] [lineHeight:inherit] w-full focus:outline-none ${
            invertIconPosition ? "order-2" : "order-1"
          } ${placeholderModifyClasses}`}
          type={passwordField ? (passHidden ? "password" : "text") : type}
          required={isRequired}
          defaultValue={defaultValue}
          value={value}
        />
        {icon && (
          <Icon
            icon={icon}
            className={`block my-1 mx-3 w-max text-inherit ${
              invertIconPosition ? "order-1" : "order-2"
            } ${iconModifyClasses}`}
          />
        )}
      </div>

      {error && (
        <p className={`text-red-600 text-sm mt-2 ${errorModifyclasses}`}>
          * {error}
        </p>
      )}
    </label>
  );
};
