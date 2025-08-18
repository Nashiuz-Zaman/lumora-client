"use client";

import { ChangeEvent } from "react";

interface ITextAreaProps {
  labelText?: string;
  placeholder?: string;
  name?: string;
  labelTextModifyClasses?: string;
  inputModifyClasses?: string;
  modifyClasses?: string;
  isRequired?: boolean;
  defaultValue?: string;
  value?: string; // controlled
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  labelText,
  placeholder = "No placeholder provided",
  name = "",
  labelTextModifyClasses = "",
  inputModifyClasses = "",
  modifyClasses = "",
  isRequired = false,
  defaultValue,
  value,
  readOnly = false,
  onChange = () => {},
}: ITextAreaProps) => {
  const isControlled = value !== undefined;

  return (
    <div className={`${modifyClasses}`}>
      <label>
        {labelText && (
          <p className={`capitalize mb-2 ${labelTextModifyClasses}`}>
            {labelText}
          </p>
        )}

        <textarea
          required={isRequired}
          onChange={onChange}
          {...(isControlled ? { value } : { defaultValue })}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`block [font-size:inherit] leading-[inherit] w-full focus:outline-none p-3 ${
            readOnly
              ? "!h-[6rem] overflow-y-auto text-neutral-400 bg-neutral-100"
              : "h-[8rem] border border-neutral-200 [background-color:inherit]"
          } ${inputModifyClasses}`}
        />
      </label>
    </div>
  );
};
