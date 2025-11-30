"use client";

import { Icon } from "@iconify/react";
import { formatDateTime } from "@/utils";
import { statusDesignMap } from "@/constants";
import { IOrderActivity } from "@/types";

interface IOrderActivityProps {
  activities?: IOrderActivity[];
}

export const OrderActivity = ({ activities }: IOrderActivityProps) => {
  const isEmpty = !Array.isArray(activities) || activities.length === 0;

  // sort only if there are activities
  const sorted = !isEmpty
    ? [...activities].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      )
    : [];

  return (
    <section className="px-4 md:px-6 lg:px-8 py-6 lg:py-8 border-t border-neutral-200">
      <h2 className="text-base lg:text-lg font-semibold mb-5">
        Order Activity
      </h2>

      {isEmpty ? (
        <div className="text-center text-neutral-500 py-10">
          No order activity available.
        </div>
      ) : (
        <ul className="space-y-6">
          {sorted.map(({ status, time }, index) => {
            const { icon, text, color } = statusDesignMap[status] ?? {
              icon: "solar:info-square-bold",
              text: "Unknown activity",
              color: "text-neutral-500",
            };

            return (
              <li key={index} className="flex items-start gap-4">
                <Icon
                  icon={icon}
                  className={`${color} w-6 h-6 shrink-0 mt-1`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm lg:text-base font-medium mb-1">
                    {text}
                  </p>
                  <time className="text-xs lg:text-sm text-neutral-500">
                    {time ? formatDateTime(time) : "Unknown time"}
                  </time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
