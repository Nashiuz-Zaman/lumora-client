"use client";

import { InputCheckbox } from "@/components/shared";
import { IReturnRequest } from "@/types/returnRequest";
import { formatDateTime, formatPrice } from "@/utils";

interface IProcessedRequestRowProps {
  requestData: IReturnRequest;
  isSelected: boolean;
  toggleSelectOne?: (item: IReturnRequest) => void;
  isLastEl?: boolean;
}

export const ProcessedRequestRow = ({
  requestData,
  isSelected,
  toggleSelectOne,
  isLastEl,
}: IProcessedRequestRowProps) => {
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center group-hover:bg-neutral-100 ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!requestData) return null;

  return (
    <>
      {/* Selection checkbox */}
      <td className={cellClasses + " !pl-4 !pr-2"}>
        <InputCheckbox
          checked={isSelected}
          onChange={() => toggleSelectOne?.(requestData)}
        />
      </td>

      {/* Order ID */}
      <td className={cellClasses}>{requestData.orderId || "—"}</td>

      {/* Customer Name */}
      <td className={cellClasses}>{requestData.name || "—"}</td>

      {/* Customer Email */}
      <td className={cellClasses}>{requestData.email || "—"}</td>

      {/* Customer Phone */}
      <td className={cellClasses}>{requestData.phone || "—"}</td>

      {/* Approved At */}
      <td className={cellClasses}>{formatDateTime(requestData.updatedAt!)}</td>

      {/* Reason */}
      <td className={cellClasses}>{requestData.reason || "—"}</td>

      {/* Invoice */}
      <td className={cellClasses}>
        {requestData.invoice ? (
          <a
            href={`/invoices/${requestData.invoice}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        ) : (
          "—"
        )}
      </td>

      {/* Total */}
      <td className={cellClasses}>{formatPrice(requestData.total || 0)}</td>
    </>
  );
};
