"use client";

// Utils
import { formatDateTime, formatPrice } from "@/utils";

// Types
import { IReturnRequest } from "@/types";

interface IPendingRequestRowProps {
  requestData: IReturnRequest;
  isLastEl?: boolean;
}

export const PendingRequestRow = ({
  requestData,
  isLastEl,
}: IPendingRequestRowProps) => {
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center group-hover:bg-neutral-100 ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!requestData) return null;

  return (
    <>
      {/* Order ID */}
      <td className={cellClasses}>{requestData.orderId}</td>

      {/* Customer */}
      <td className={cellClasses}>{requestData.name ?? "-"}</td>

      {/* Email */}
      <td className={cellClasses + " break-all"}>{requestData.email ?? "-"}</td>

      {/* Phone */}
      <td className={cellClasses}>{requestData.phone ?? "-"}</td>

      {/* Created At */}
      <td className={cellClasses}>
        {requestData.createdAt ? formatDateTime(requestData.createdAt) : "-"}
      </td>

      {/* Reason */}
      <td className={cellClasses}>{requestData.reason ?? "-"}</td>

      {/* Invoice */}
      <td className={cellClasses}>
        {requestData.invoice ? (
          <a
            onClick={(e) => e.stopPropagation()}
            href={requestData.invoice}
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
      <td className={cellClasses}>
        {requestData?.total ? formatPrice(requestData.total) : "-"}
      </td>
    </>
  );
};
