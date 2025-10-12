"use client";

// components
import { IPayment } from "@/types";

// utils
import { formatDateTime, formatPrice } from "@/utils";

interface IRefundedPaymentRowProps {
  paymentData: IPayment;
  isLastEl?: boolean;
}

export const RefundedPaymentRow = ({
  paymentData,
  isLastEl,
}: IRefundedPaymentRowProps) => {
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!paymentData) return null;

  return (
    <>
      {/* Order ID */}
      <td className={cellClasses}>
        <p>{paymentData.orderId}</p>
      </td>

      {/* Customer Name */}
      <td className={cellClasses}>{paymentData.name}</td>

      {/* Email */}
      <td className={cellClasses + " break-all"}>{paymentData.email}</td>

      {/* Received at */}
      <td className={cellClasses}>
        {paymentData.updatedAt && formatDateTime(paymentData.updatedAt!)}
      </td>

      {/* Amount */}
      <td className={cellClasses}>{formatPrice(paymentData.amount)}</td>

      {/* Type */}
      <td className={cellClasses}>{paymentData.cardType ?? "-"}</td>

      {/* Refund Reason */}
      <td className={cellClasses}>{paymentData.refundReason || "---"}</td>
    </>
  );
};
