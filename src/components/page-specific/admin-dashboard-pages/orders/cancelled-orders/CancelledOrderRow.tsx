"use client";

// components
import { InputCheckbox } from "@/components/shared";
import { IOrder } from "@/types";

// utils
import { formatDateTime } from "@/utils/formatDateTime";
import { formatPrice } from "@/utils/formatPrice";

interface ICancelledOrderRowProps {
  orderData: IOrder;
  isSelected: boolean;
  functions: {
    toggleSelectOne?: (order: IOrder) => void;
  };
  isLastEl?: boolean;
}

export const CancelledOrderRow = ({
  orderData,
  isSelected,
  functions,
  isLastEl,
}: ICancelledOrderRowProps) => {
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
      {/* Order Total */}
      <td className={cellClasses}>{formatPrice(orderData.total)}</td>
      
      {/* Cancelled Time */}
      <td className={cellClasses}>
        {orderData.updatedAt && formatDateTime(orderData.updatedAt)}
      </td>

      {/* Reason */}
      <td className={cellClasses}>{orderData.cancellationReason ?? "-"}</td>
    </>
  );
};
