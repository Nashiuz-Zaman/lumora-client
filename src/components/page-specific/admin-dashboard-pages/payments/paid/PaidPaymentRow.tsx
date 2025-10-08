"use client";

// components
import { ButtonBtnTrans } from "@/components/shared";
import { RefundIcon } from "@/components/shared";

// types
import { IPayment } from "@/types";

// utils
import { formatDateTime, formatPrice } from "@/utils";

interface IPaidPaymentRowProps {
  paymentData: IPayment;
  setSingle: (id: IPayment["_id"]) => void;
  functions?: {
    openRefundModal?: () => void;
  };
  isLastEl?: boolean;
}

export const PaidPaymentRow = ({
  paymentData,
  setSingle,
  functions = {},
  isLastEl,
}: IPaidPaymentRowProps) => {
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
        {paymentData.updatedAt && formatDateTime(paymentData.createdAt!)}
      </td>

      {/* Amount */}
      <td className={cellClasses}>{formatPrice(paymentData.amount)}</td>

      {/* Type */}
      <td className={cellClasses}>{paymentData.cardType ?? "-"}</td>

      {/* Actions */}
      <td className={cellClasses + " flex h-max items-center gap-4"}>
        <ButtonBtnTrans
          onClick={() => {
            setSingle(paymentData._id);
            functions?.openRefundModal?.();
          }}
          title="Refund Payment"
          className="text-blue-500"
        >
          <RefundIcon className="text-xl" />
          Refund
        </ButtonBtnTrans>
      </td>
    </>
  );
};
