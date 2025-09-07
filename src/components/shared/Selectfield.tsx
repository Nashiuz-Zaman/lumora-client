"use client";

import { useRef, useState } from "react";
import { DownCaretIcon } from "./icons";

interface IOption {
  text: string;
  value: string;
}

interface ISelectFieldProps {
  labelText?: string;
  placeholder?: string;
  options: IOption[];
  icon?: boolean;
  invertIconPosition?: boolean;
  labelTextClassName?: string;
  selectClassName?: string;
  className?: string;
  labelContainerClassName?: string;
  iconClassName?: string;
  error?: string;
  errorClassName?: string;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  [key: string]: unknown;
}

export const SelectField = ({
  labelText,
  placeholder = "Select an option",
  options,
  icon = true,
  invertIconPosition = false,
  labelTextClassName = "",
  selectClassName = "",
  className = "",
  labelContainerClassName = "",
  iconClassName = "",
  errorClassName = "",
  error,
  ...props
}: ISelectFieldProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click(); // open native dropdown
    }
  };

  return (
    <label className={`block w-full ${className}`}>
      {labelText && (
        <div
          className={`mb-2 ${labelContainerClassName}`}
        >
          <span className={`${labelTextClassName}`}>{labelText}</span>
        </div>
      )}

      <div
        className={`relative w-full bg-white border border-neutral-300 rounded-lg transition-all duration-200 ${selectClassName}`}
      >
        <select
          {...props}
          ref={selectRef}
          onClick={() => setIsOpen((prev) => !prev)}
          onBlur={() => setIsOpen(false)}
          className="appearance-none w-full bg-transparent py-3 px-4 rounded-lg cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>

        {icon && (
          <div
            onClick={handleToggle}
            className={`absolute y-center ${
              invertIconPosition ? "left-3" : "right-3"
            } pointer-events-auto cursor-pointer transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <DownCaretIcon className={`w-4 h-4 ${iconClassName}`} />
          </div>
        )}
      </div>

      {error && (
        <p className={`text-red-600 text-sm mt-1 ${errorClassName}`}>
          * {error}
        </p>
      )}
    </label>
  );
};
