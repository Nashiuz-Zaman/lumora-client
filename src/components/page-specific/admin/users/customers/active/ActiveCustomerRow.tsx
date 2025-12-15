"use client";

// Next
import Image from "next/image";

// components
import {
  ButtonBtnTrans,
  InputCheckbox,
  WarningIcon,
} from "@/components/shared";

// hooks
import { TUseSelectableReturn } from "@/hooks";

// types
import { IPaginatedCustomer } from "@/types";

// utils
import { formatDateTime } from "@/utils";

interface IActiveCustomerRowProps {
  customer: IPaginatedCustomer;
  isSelected: boolean;
  toggleSelectOne?: TUseSelectableReturn<
    IPaginatedCustomer,
    "userId"
  >["toggleSelectOne"];
  setSingle: (id: IPaginatedCustomer["_id"]) => void;
  onBlock?: () => void;
  isLastEl?: boolean;
}

export const ActiveCustomerRow = ({
  customer,
  isSelected,
  toggleSelectOne,
  setSingle,
  onBlock,
  isLastEl,
}: IActiveCustomerRowProps) => {
  const cellClasses = `font-medium text-sm px-4 py-3 flex items-center ${
    !isLastEl ? "border-b border-neutral-200" : ""
  }`;

  if (!customer) return null;

  return (
    <>
      {/* Checkbox */}
      <td className={cellClasses + " justify-center"}>
        <InputCheckbox
          checked={isSelected}
          onChange={() => toggleSelectOne?.(customer)}
        />
      </td>

      {/* Avatar */}
      <td className={cellClasses}>
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-200">
          <Image
            src={customer.image as string}
            alt={customer.name || "Customer"}
            fill
            className="object-cover"
          />
        </div>
      </td>

      {/* Name */}
      <td className={cellClasses}>{customer.name || "-"}</td>

      {/* Phone */}
      <td className={cellClasses}>{customer.phone || "-"}</td>

      {/* Email */}
      <td className={cellClasses + " break-all"}>{customer.email}</td>

      {/* Joined At */}
      <td className={cellClasses}>
        {customer.createdAt && formatDateTime(customer.createdAt)}
      </td>

      {/* Last Login */}
      <td className={cellClasses}>
        {customer.lastLoginAt ? formatDateTime(customer.lastLoginAt) : "-"}
      </td>

      {/* Actions */}
      <td className={cellClasses}>
        <ButtonBtnTrans
          onClick={() => {
            setSingle(customer._id);
            onBlock?.();
          }}
          title="Block Customer"
        >
          <WarningIcon className="text-red-500 text-xl" />
        </ButtonBtnTrans>
      </td>
    </>
  );
};
