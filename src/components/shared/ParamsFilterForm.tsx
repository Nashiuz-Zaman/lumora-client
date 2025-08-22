"use client";

import {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
  SetStateAction,
  Dispatch,
} from "react";

import { Inputfield } from "./Inputfield";

import { DownCaretIcon } from "./icons";
import { ButtonBtn } from "./buttons";
import { OptionsDropdown } from "./OptionsDropdown";
import SortOptionsMenu from "./SortOptionsMenu";

export type TParamsFilterFormOptions = {
  label: string;
  value: string | number;
}[];

interface IParamsFilterFormProps<T> {
  params: T;
  setParams: Dispatch<SetStateAction<T>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortOptions: TParamsFilterFormOptions;
  placeholder?: string;
  showStatusFilter?: boolean;
  statusOptions?: TParamsFilterFormOptions;
  roleLabel?: string;
}

export const ParamsFilterForm = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>
>({
  params,
  setParams,
  onSubmit,
  sortOptions,
  placeholder,
  showStatusFilter = false,
  statusOptions = [],
  roleLabel = "",
}: IParamsFilterFormProps<T>) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSortChange = useCallback(
    (value: string | number) => {
      setParams((prev) => ({ ...prev, sort: value }));
    },
    [setParams]
  );

  const handleStatusChange = (status: string | number) => {
    setParams((prev) => ({ ...prev, status }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="py-3 px-4 bg-white border-b border-neutral-200 flex flex-col lg:flex-row gap-5 items-center justify-between"
    >
      <Inputfield
        onChange={handleSearchChange}
        value={params.search}
        placeholder={placeholder || `Search ${roleLabel}s`}
        inputClassName="rounded-md"
        className="w-full lg:!max-w-[20rem] 2xl:!max-w-[27rem]"
      />

      <div className="flex flex-col xs:flex-row items-center justify-between w-full gap-4 xl:ml-4">
        {showStatusFilter && (
          <div className="flex items-center justify-center flex-wrap gap-2 xs:justify-start">
            {statusOptions.map(({ label, value }) => (
              <ButtonBtn
                key={value}
                type="button"
                onClick={() => handleStatusChange(value)}
                className={`!py-2 !px-3 ${
                  params.status === value ? "!primaryClasses" : ""
                }`}
              >
                {label}
              </ButtonBtn>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 justify-center xs:ml-auto">
          <div className="relative ml-auto">
            <ButtonBtn
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="!systemClasses !px-3 !py-2"
            >
              Sort <DownCaretIcon />
            </ButtonBtn>

            <OptionsDropdown
              className="z-[200]"
              setShow={setIsSortOpen}
              show={isSortOpen}
            >
              <SortOptionsMenu
                selected={String(params.sort)}
                onUpdate={handleSortChange}
                options={sortOptions}
              />
            </OptionsDropdown>
          </div>

          <ButtonBtn type="submit" className="!primaryClasses !py-2 !px-3">
            Search
          </ButtonBtn>
        </div>
      </div>
    </form>
  );
};
