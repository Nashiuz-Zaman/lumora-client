"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import {
  ParamsFilterForm,
  TParamsFilterFormOptions,
} from "@/components/shared";
import { IAllProductQueryParams } from "@/hooks";

interface ITopProductParamsFormProps {
  params: IAllProductQueryParams;
  setParams: Dispatch<SetStateAction<IAllProductQueryParams>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortOptions: TParamsFilterFormOptions;
  showStatusFilter?: boolean;
}

const ProductsTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  showStatusFilter = false,
}: ITopProductParamsFormProps) => {
  // Strongly typed status options
  const statusOptions: TParamsFilterFormOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "1" },
    { label: "Draft", value: "0" },
  ];

  return (
    <ParamsFilterForm<IAllProductQueryParams>
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
