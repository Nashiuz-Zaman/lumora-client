"use client";

import { StarEmptyIcon, StarFullIcon, StarHalfIcon } from "./icons";

interface IRatingStarsProps {
  rating: number;
  className?: string;
}

export const RatingStars = ({
  rating = 2,
  className = "",
}: IRatingStarsProps) => {
  // Round to nearest 0.5
  const rounded = Math.round(rating * 2) / 2;

  console.log(rating)

  const starEls: ("full" | "half" | "empty")[] = Array.from(
    { length: 5 },
    (_, i) => {
      const num = i + 1;
      return num <= rounded ? "full" : num - 0.5 <= rounded ? "half" : "empty";
    }
  );

  return (
    <div className={`flex items-center gap-[2px] text-yellow-400 ${className}`}>
      {starEls.map((star, i) => {
        if (star === "full") return <StarFullIcon key={i} />;
        if (star === "half") return <StarHalfIcon key={i} />;
        return <StarEmptyIcon key={i} />;
      })}
    </div>
  );
};
