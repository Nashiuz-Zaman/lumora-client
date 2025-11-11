"use client";

import { IOrder } from "@/types";
import {
  getOrderStatusLabel,
  getOrderStatusTextColor,
  formatPrice,
  formatDateTime,
} from "@/utils";

interface IDeliveredOrderRowProps {
  orderData: IOrder;
  isLastEl?: boolean;
}

export const DeliveredOrderRow = ({
  orderData,
  isLastEl,
}: IDeliveredOrderRowProps) => {
  if (!orderData) return null;

  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  return (
    <>
      {/* Order ID */}
      <td className={cellClasses}>
        <p>{orderData.orderId}</p>
      </td>

      {/* Customer Name */}
      <td className={cellClasses}>{orderData.name}</td>

      {/* Phone */}
      <td className={cellClasses}>{orderData.phone ?? "-"}</td>

      {/* Email */}
      <td className={cellClasses + " break-all"}>{orderData.email}</td>

      {/* Shipped At */}
      <td className={cellClasses}>
        {orderData.updatedAt ? formatDateTime(orderData.updatedAt) : "-"}
      </td>

      {/* Status */}
      <td
        className={`${cellClasses} ${getOrderStatusTextColor(
          orderData.status
        )}`}
      >
        {getOrderStatusLabel(orderData.status)}
      </td>

      {/* Invoice */}
      <td className={cellClasses}>
        {orderData.invoice ? (
          <a
            onClick={(e) => e.stopPropagation()}
            href={orderData.invoice}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold underline"
          >
            View
          </a>
        ) : (
          "-"
        )}
      </td>

      {/* Total */}
      <td className={cellClasses}>{formatPrice(orderData.total)}</td>
    </>
  );
};
