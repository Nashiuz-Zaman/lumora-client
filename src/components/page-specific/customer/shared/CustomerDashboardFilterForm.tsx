"use client";

import {
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { InputField } from "@/components/shared";
import { ButtonBtn } from "@/components/shared/buttons";
import { SortDropdown } from "@/components/shared/SortDropdown";
import { SearchIcon } from "@/components/shared/icons";
import { StatusTabs, TStatusOptions } from "../orders/StatusTabs";
import { TSortOptions } from "@/types/generic";

export interface ICustomerDashboardFilterFormProps<
  Params extends Record<string, any>,
  Resource extends Record<string, any>
> {
  formParams: Params;
  setFormParams: Dispatch<SetStateAction<Params>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortOptions: TSortOptions<any>;
  statusOptions?: TStatusOptions<Resource>;
  placeholder?: string;
  roleLabel?: string;
  className?: string;
  searchTitle?: string;
  statusTitle?: string;
}

export const CustomerDashboardFilterForm = <
  Params extends Record<string, any>,
  StatusResource extends Record<string, any>
>({
  formParams,
  setFormParams,
  onSubmit,
  sortOptions,
  statusOptions = [],
  placeholder,
  roleLabel = "Order",
  className = "",
  searchTitle = "Search",
  statusTitle = "Status",
}: ICustomerDashboardFilterFormProps<Params, StatusResource>) => {
  // Search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormParams((prev) => ({ ...prev, search: e.target.value }));
  };

  // Sort change
  const handleSortChange = useCallback(
    (value: string | number) => {
      setFormParams((prev) => ({ ...prev, sort: value }));
    },
    [setFormParams]
  );

  // Status change
  const handleStatusChange = (status: string) => {
    setFormParams((prev) => ({ ...prev, status }));
  };

  return (
    <form onSubmit={onSubmit} className={`mb-12 ${className}`}>
      {/* heading */}
      <h2 className="text-xl font-semibold text-neutral-800 mb-3">
        {searchTitle}
      </h2>

      <InputField
        icon={<SearchIcon />}
        invertIconPosition
        onChange={handleSearchChange}
        value={formParams.search || ""}
        placeholder={placeholder || `Search ${roleLabel}s`}
        inputClassName="rounded-md"
        className="w-full lg:!max-w-[40%] mb-8"
      />

      <div className="flex flex-col xs:flex-row flex-wrap items-end w-full">
        {/* Status Tabs */}

        {statusOptions.length > 0 && (
          <h2 className="w-full text-xl font-semibold text-neutral-800 mb-4">
            {statusTitle}
          </h2>
        )}

        {/* Sort + Search button */}
        <div className="flex items-center gap-4 justify-center">
          <StatusTabs<StatusResource>
            statuses={statusOptions}
            activeStatus={formParams.status}
            onStatusChange={handleStatusChange}
          />

          <SortDropdown
            buttonLabel="Sort"
            selected={String(formParams.sort || "")}
            options={sortOptions}
            onUpdate={handleSortChange}
            buttonClassName="!systemClasses !px-3 !py-2 xs:ml-6 xl:ml-10"
            className="ml-auto"
          />

          <ButtonBtn type="submit" className="!successClasses !py-2 !px-3">
            Search
          </ButtonBtn>
        </div>
      </div>
    </form>
  );
};
