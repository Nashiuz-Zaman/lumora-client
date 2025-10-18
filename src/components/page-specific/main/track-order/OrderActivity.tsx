"use client";

import { Icon } from "@iconify/react";
import { formatDateTime } from "@/utils";
import { OrderStatus } from "@/constants";
import { IOrderActivity } from "@/types";

interface IOrderActivityProps {
  activities?: IOrderActivity[];
}

const statusDesignMap: Record<
  (typeof OrderStatus)[keyof typeof OrderStatus],
  { icon: string; text: string; color: string }
> = {
  [OrderStatus.Pending]: {
    icon: "solar:clock-circle-bold",
    text: "Your order is pending confirmation.",
    color: "text-yellow-500",
  },
  [OrderStatus.Confirmed]: {
    icon: "solar:check-circle-bold",
    text: "Your order has been confirmed.",
    color: "text-green-600",
  },
  [OrderStatus.Shipped]: {
    icon: "mdi:truck-delivery",
    text: "Your order has been shipped.",
    color: "text-green-500",
  },
  [OrderStatus.Delivered]: {
    icon: "solar:handshake-bold",
    text: "Your order has been delivered. Thank you for shopping with us!",
    color: "text-green-700",
  },
  [OrderStatus.Cancelled]: {
    icon: "solar:close-circle-bold",
    text: "Your order was cancelled.",
    color: "text-red-600",
  },
  [OrderStatus.Returned]: {
    icon: "solar:refresh-circle-bold",
    text: "Your order was returned.",
    color: "text-yellow-600",
  },
};

export const OrderActivity = ({ activities }: IOrderActivityProps) => {
  if (!Array.isArray(activities) || activities.length === 0) return null;

  const sorted = [...activities].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <section className="px-4 md:px-6 lg:px-8 py-6 lg:py-8 border-t border-neutral-200">
      <h2 className="text-base lg:text-lg font-semibold mb-5">
        Order Activity
      </h2>

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
                <p className="text-sm lg:text-base font-medium mb-1">{text}</p>
                <time className="text-xs lg:text-sm text-neutral-500">
                  {time ? formatDateTime(time) : "Unknown time"}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
