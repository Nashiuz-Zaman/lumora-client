"use client";

import {
  IParamsFilterFormProps,
  ParamsFilterForm,
  TStatusOptions,
} from "@/components/shared";
import { IProduct } from "@/types";
import { IProductQueriesParams } from "@/hooks";

const ProductsTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  showStatusFilter = false,
}: IParamsFilterFormProps<IProductQueriesParams, IProduct>) => {
  const statusOptions: TStatusOptions<IProduct> = [
    { label: "All", value: "all" },
    { label: "Active", value: 1 },
    { label: "Draft", value: 0 },
  ];

  return (
    <ParamsFilterForm
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      showStatusFilter={showStatusFilter}
      statusOptions={showStatusFilter ? statusOptions : undefined}
      roleLabel="Product"
    />
  );
};

export default ProductsTopParamsForm;
