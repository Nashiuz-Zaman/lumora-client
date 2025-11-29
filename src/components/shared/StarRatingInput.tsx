"use client";

import React, { useState } from "react";
import { StarEmptyIcon, StarFullIcon } from "./icons";

interface IStarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const StarRatingInput = ({ value, onChange }: IStarRatingInputProps) => {
  const [hovered, setHovered] = useState<number>(0);

  return (
    <div className="flex gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hovered || value);

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="focus:outline-none transition-colors text-yellow-400"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            {isActive ? <StarFullIcon /> : <StarEmptyIcon />}
          </button>
        );
      })}
    </div>
  );
};
