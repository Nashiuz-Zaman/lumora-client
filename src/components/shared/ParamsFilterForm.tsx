"use client";

import {
  useCallback,
  ChangeEvent,
  FormEvent,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef,
} from "react";
import { Inputfield } from "./Inputfield";
import { ButtonBtn, ButtonBtnTrans } from "./buttons";
import { SortDropdown } from "./SortDropdown";
import { useRefState } from "@/hooks";

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

export const ParamsFilterForm = <T extends Record<string, any>>({
  params,
  setParams,
  onSubmit,
  sortOptions,
  placeholder,
  showStatusFilter = false,
  statusOptions = [],
  roleLabel = "",
}: IParamsFilterFormProps<T>) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  };
  const ref = useRef<HTMLFormElement>(null);
  const { setRefs } = useRefState();

  useEffect(() => {
    setRefs((prev) => {
      if (!prev.paramsFilterForm) {
        return { ...prev, paramsFilterForm: ref };
      }

      return prev;
    });

    return () => setRefs((prev) => ({ ...prev, paramsFilterForm: null }));
  }, [setRefs]);

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
      ref={ref}
      onSubmit={onSubmit}
      className="px-4 shrink-0 py-2 bg-white border-b border-neutral-200 flex flex-col lg:flex-row gap-5 items-center justify-between"
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
          <div className="flex items-center justify-center flex-wrap gap-5 xs:justify-start">
            {statusOptions.map(({ label, value }) => (
              <ButtonBtnTrans
                key={value}
                type="button"
                onClick={() => handleStatusChange(value)}
                className={`${
                  params.status === value
                    ? "text-primary text-shadow-primary"
                    : ""
                }`}
              >
                {label}
              </ButtonBtnTrans>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 justify-center xs:ml-auto">
          <SortDropdown
            buttonLabel="Sort"
            selected={String(params.sort)}
            options={sortOptions}
            onUpdate={handleSortChange}
            buttonClassName="!systemClasses !px-3 !py-2"
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
