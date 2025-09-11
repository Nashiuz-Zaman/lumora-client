"use client";

import Marquee from "react-fast-marquee";
import { ReactNode } from "react";

type TCustomMarqueeProps<T> = {
  data: T[];
  renderItem: ({ data, index }: { data: T; index: number }) => ReactNode;
  speed?: number;
  gap?: string;
  paddingRight?: string;
};

export const CustomMarquee = <T,>({
  data,
  renderItem,
  speed = 20,
  gap = "gap-6",
  paddingRight = "pr-6",
}: TCustomMarqueeProps<T>) => {
  if (!data || data.length === 0) return null;

  return (
    <Marquee speed={speed}>
      <div className={`flex items-center ${gap} ${paddingRight}`}>
        {data?.map((item, i) => renderItem({ data: item, index: i }))}
      </div>
    </Marquee>
  );
};
