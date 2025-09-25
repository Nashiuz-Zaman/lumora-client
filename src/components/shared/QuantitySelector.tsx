"use client";

import React from "react";

interface IQuantitySelectorProps {
  quantity: number;
  max?: number; // optional max limit (like stock)
  min?: number; // default to 1
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantitySelector = ({
  quantity,
  max,
  min = 1,
  onIncrease,
  onDecrease,
  className = "",
}: IQuantitySelectorProps) => {
  return (
    <div
      className={`flex items-center border border-neutral-300 rounded-lg overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        className="px-3 py-2 text-lg font-medium hover:bg-neutral-100 disabled:opacity-50 cursor-pointer"
        disabled={quantity <= min}
      >
        –
      </button>
      <span className="px-4 py-2 text-sm font-semibold">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="px-3 py-2 text-lg font-medium hover:bg-neutral-100 disabled:opacity-50 cursor-pointer"
        disabled={max !== undefined ? quantity >= max : false}
      >
        +
      </button>
    </div>
  );
};
