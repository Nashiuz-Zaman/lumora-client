"use client";

import { IOrder } from "@/types";
import { formatPrice, formatDateTime } from "@/utils";

export const OrderTrackingHeader = ({ order }: { order?: IOrder }) => {
  return (
    <div className="border-b border-neutral-200 px-4 py-5 md:px-6 lg:px-8 md:py-8 space-y-5">
      {/* Order Summary Card */}
      <div className="grid gap-4 md:grid-cols-2 md:items-center border border-neutral-200 bg-neutral-50 rounded-md px-4 py-5">
        {/* Order ID & Details */}
        <div>
          <p className="text-lg lg:text-2xl font-semibold">
            {order ? `Order #${order.orderId}` : "No Order"}
          </p>
          <p className="text-sm mt-1">
            {order
              ? order.items?.length
                ? order.items.length > 1
                  ? `${order.items.length} Products`
                  : "1 Product"
                : "0 Products"
              : "N/A"}
            <span className="mx-1">&bull;</span>
            Placed on:{" "}
            {order?.createdAt ? formatDateTime(order.createdAt) : "N/A"}
          </p>
        </div>

        {/* Total Price */}
        <div className="text-end md:text-right">
          <p className="text-xl lg:text-3xl font-bold">
            {order ? formatPrice(order.total) : "N/A"}
          </p>
        </div>
      </div>

      {/* ETA */}
      <div>
        <p className="text-sm md:text-base font-medium text-neutral-700">
          <span className="text-neutral-600 font-normal">
            Expected Arrival:
          </span>{" "}
          <span className="text-blue-500">
            {order?.estimatedDelivery ? order.estimatedDelivery : "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
};
