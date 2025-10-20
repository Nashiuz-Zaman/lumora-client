"use client";

import { IOrder } from "@/types";
import { formatPrice, formatDateTime } from "@/utils";

export const OrderHeaderTrackingPage = ({ order }: { order: IOrder }) => {
  if (!order) return null;

  return (
    <div className="border-b border-neutral-200 px-4 py-5 md:px-6 lg:px-8 md:py-8 space-y-5">
      {/* Order Summary Card */}
      <div className="grid gap-4 md:grid-cols-2 md:items-center border border-neutral-200 bg-neutral-50 rounded-md px-4 py-5">
        {/* Order ID & Details */}
        <div>
          <p className="text-lg lg:text-2xl font-semibold">
            Order #{order.orderId}
          </p>
          <p className="text-sm mt-1">
            {order.items?.length > 1
              ? `${order.items.length} Products`
              : "1 Product"}
            <span className="mx-1">&bull;</span>
            Placed on: {formatDateTime(order.createdAt!)}
          </p>
        </div>

        {/* Total Price */}
        <div className="text-end md:text-right">
          <p className="text-xl lg:text-3xl font-bold">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      {/* ETA */}
      <div>
        <p className="text-sm md:text-base font-medium text-neutral-700">
          <span className="text-neutral-600 font-normal">Expected Arrival:</span>{" "}
          <span className="text-blue-500">
            {order.estimatedDelivery || "—"}
          </span>
        </p>
      </div>
    </div>
  );
};
