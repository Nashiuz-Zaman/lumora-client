"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import {
  ParamsFilterForm,
  TParamsFilterFormOptions,
} from "@/components/shared";

interface IOrdersTopParamsFormProps<T> {
  params: T;
  setParams: Dispatch<SetStateAction<T>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortOptions: TParamsFilterFormOptions;
  className?: string;
}

export const OrdersTopParamsForm = <T extends Record<string, any>>({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IOrdersTopParamsFormProps<T>) => {
  return (
    <ParamsFilterForm<T>
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      placeholder="Search Orders"
      showStatusFilter={false}
      roleLabel="Product"
      className={className}
    />
  );
};
