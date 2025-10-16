"use client";

import { InputCheckbox } from "@/components/shared";
import { IOrder } from "@/types";
import {
  getOrderStatusLabel,
  getOrderStatusTextColor,
  formatPrice,
  formatDateTime,
} from "@/utils";

interface IReturnedOrderRowProps {
  orderData: IOrder;
  isSelected: boolean;
  functions: {
    toggleSelectOne?: (order: IOrder) => void;
  };
  isLastEl?: boolean;
}

export const ReturnedOrderRow = ({
  orderData,
  isSelected,
  functions,
  isLastEl,
}: IReturnedOrderRowProps) => {
  const { toggleSelectOne } = functions;
  if (!orderData) return null;

  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  return (
    <>
      {/* Checkbox */}
      <td className={cellClasses + " !pl-4 !pr-2"}>
        <InputCheckbox
          checked={isSelected}
          onChange={() => toggleSelectOne?.(orderData)}
        />
      </td>

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

      {/* Total */}
      <td className={cellClasses}>{formatPrice(orderData.total)}</td>
    </>
  );
};
