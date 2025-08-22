"use client";

import React from "react";

export interface IRadioOption {
  label: string;
  value: string | number ;
}

interface IRadioButtonGroupProps {
  options?: IRadioOption[];
  name: string;
  selectedValue: string;
  onChange: (value: string | number) => void;
  className?: string;
}

export const RadioButtonGroup = ({
  options = [],
  name,
  selectedValue,
  onChange,
  className = "",
}: IRadioButtonGroupProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="accent-primary"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
