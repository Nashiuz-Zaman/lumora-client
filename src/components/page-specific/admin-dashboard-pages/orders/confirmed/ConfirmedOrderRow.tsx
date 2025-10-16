"use client";

// components
import { ButtonBtnTrans, InputCheckbox } from "@/components/shared";
import { TruckIcon, WarningIcon } from "@/components/shared";

// hooks
import { TUseSelectableReturn } from "@/hooks";

// types
import { IOrder } from "@/types";

// utils
import { formatDateTime, formatPrice } from "@/utils";

interface IConfirmedOrderRowProps {
  orderData: IOrder;
  isSelected: boolean;
  toggleSelectOne?: TUseSelectableReturn<IOrder, "_id">["toggleSelectOne"];
  setSingle: (id: IOrder["_id"]) => void;
  functions?: {
    openShippingModal?: () => void;
    openCancelModal?: () => void;
    [key: string]: (() => void) | undefined;
  };
  isLastEl?: boolean;
}

export const ConfirmedOrderRow = ({
  orderData,
  isSelected,
  toggleSelectOne,
  setSingle,
  functions = {},
  isLastEl,
}: IConfirmedOrderRowProps) => {
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!orderData) return null;

  return (
    <>
      {/* Checkbox */}
      <td className={cellClasses + " !pl-4 !pr-2 w-[1.6rem]"}>
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

      {/* Order Total */}
      <td className={cellClasses}>{formatPrice(orderData.total)}</td>

      {/* Actions */}
      <td className={cellClasses + " flex h-max items-center gap-4"}>
        <ButtonBtnTrans
          onClick={() => {
            setSingle(orderData._id);
            functions?.openShippingModal?.();
          }}
          title="Ship Order"
          className="text-primary-light text-3xl"
        >
          <TruckIcon />
        </ButtonBtnTrans>

        <ButtonBtnTrans
          onClick={() => {
            setSingle(orderData._id);
            functions?.openCancelModal?.();
          }}
          title="Cancel Order"
          className="text-red-500 text-xl"
        >
          <WarningIcon />
        </ButtonBtnTrans>
      </td>
    </>
  );
};
