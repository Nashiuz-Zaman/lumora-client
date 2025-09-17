"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import {
  ParamsFilterForm,
  TParamsFilterFormOptions,
} from "@/components/shared";

interface IProductTopParamsFormProps<T> {
  params: T;
  setParams: Dispatch<SetStateAction<T>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortOptions: TParamsFilterFormOptions;
  showStatusFilter?: boolean;
}

const ProductsTopParamsForm = <T extends Record<string, any>>({
  params,
  setParams,
  onSubmit,
  sortOptions,
  showStatusFilter = false,
}: IProductTopParamsFormProps<T>) => {
  const statusOptions: TParamsFilterFormOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "1" },
    { label: "Draft", value: "0" },
  ];

  return (
    <ParamsFilterForm<T>
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      placeholder="Search Products"
      showStatusFilter={showStatusFilter}
      statusOptions={showStatusFilter ? statusOptions : undefined}
      roleLabel="Product"
    />
  );
};

export default ProductsTopParamsForm;
