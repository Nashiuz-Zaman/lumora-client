"use client";

import { useState } from "react";

interface InputFieldMinMaxProps {
  labelMin?: string;
  labelMax?: string;
  min?: number;
  max?: number;

  prefix?: string;
  placeholderMin?: string;
  placeholderMax?: string;
  onChange?: (minValue: number, maxValue: number) => void;
}

export const InputFieldMinMax = ({
  labelMin = "Min",
  labelMax = "Max",
  min = 0,
  max = 100,

  prefix,
  placeholderMin,
  placeholderMax,
  onChange,
}: InputFieldMinMaxProps) => {
  const [currentMin, setCurrentMin] = useState<number>(min);
  const [currentMax, setCurrentMax] = useState<number>(max);

  const handleMinChange = (value: number) => {
    setCurrentMin(value);
    onChange?.(value, currentMax);
  };

  const handleMaxChange = (value: number) => {
    setCurrentMax(value);
    onChange?.(currentMin, value);
  };

  const renderInput = (
    value: number,
    onChangeHandler: (val: number) => void,
    placeholder?: string,
  ) => (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
          {prefix}
        </span>
      )}

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChangeHandler(Number(e.target.value))}
        className={`w-full ${
          prefix ? "pl-8" : "pl-4"
        } pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-0 text-neutral-800 placeholder-neutral-400 transition-all duration-200 hover:shadow-sm`}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="flex gap-4 items-center">
      {/* Min Field */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {labelMin}
        </label>
        {renderInput(currentMin, handleMinChange, placeholderMin)}
      </div>

      {/* Max Field */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {labelMax}
        </label>
        {renderInput(currentMax, handleMaxChange, placeholderMax)}
      </div>
    </div>
  );
};
