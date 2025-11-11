"use client";

// components
import { InputCheckbox } from "@/components/shared";
import { IOrder } from "@/types";

// utils
import { formatDateTime } from "@/utils/formatDateTime";
import { formatPrice } from "@/utils/formatPrice";

interface IShippedOrderRowProps {
  orderData: IOrder;
  isSelected: boolean;
  functions: {
    toggleSelectOne?: (order: IOrder) => void;
  };
  isLastEl?: boolean;
}

export const ShippedOrderRow = ({
  orderData,
  isSelected,
  functions,
  isLastEl,
}: IShippedOrderRowProps) => {
  const { toggleSelectOne } = functions;
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!orderData) return null;

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

      {/* Updated Time */}
      <td className={cellClasses}>
        {orderData.updatedAt && formatDateTime(orderData.updatedAt)}
      </td>

      {/* ETA */}
      <td className={cellClasses}>
        {orderData.estimatedDelivery &&
          formatDateTime(orderData.estimatedDelivery)}
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

      {/* Order Total */}
      <td className={cellClasses}>{formatPrice(orderData.total)}</td>
    </>
  );
};
