"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Icon } from "@iconify/react";

type TInputCheckboxProps = {
  labelText?: string;
  name?: string;
  isRequired?: boolean;
  readOnly?: boolean;
  checked?: boolean; // controlled
  defaultChecked?: boolean; // uncontrolled
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: string | null;
  invertIconPosition?: boolean;
  labelTextModifyClasses?: string;
  checkboxModifyClasses?: string;
  iconModifyClasses?: string;
  modifyClasses?: string;
};

export const InputCheckbox = ({
  labelText,
  name = "",
  isRequired = false,
  readOnly = false,
  checked,
  defaultChecked,
  onChange = () => {},
  icon = null,
  invertIconPosition = false,
  labelTextModifyClasses = "",
  checkboxModifyClasses = "",
  iconModifyClasses = "",
  modifyClasses = "",
}: TInputCheckboxProps) => {
  const isControlled = checked !== undefined;

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked || false
  );

  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked, isControlled]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange(e);
  };

  return (
    <label
      className={`flex items-center w-max gap-2 [color:inherit] cursor-pointer select-none ${
        invertIconPosition ? "flex-row-reverse" : ""
      } ${modifyClasses}`}
    >
      {/* Optional Icon */}
      {icon && (
        <Icon icon={icon} className={`text-inherit ${iconModifyClasses}`} />
      )}

      {/* Checkbox */}
      <input
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
        name={name}
        required={isRequired}
        readOnly={readOnly}
        {...(isControlled ? { checked } : { defaultChecked: internalChecked })}
        onChange={handleChange}
        className={`accent-green-700 cursor-pointer ${checkboxModifyClasses}`}
      />

      {/* Label text */}
      {labelText && (
        <span className={`text-inherit ${labelTextModifyClasses}`}>
          {labelText}
        </span>
      )}
    </label>
  );
};


