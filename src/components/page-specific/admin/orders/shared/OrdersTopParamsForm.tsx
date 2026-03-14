"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@shared/ParamsFilterForm";
import { IOrderQueriesParams } from "@/hooks/useOrderQueries";
import { IOrder } from "@/types";

export const OrdersTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IParamsFilterFormProps<IOrderQueriesParams, IOrder>) => {
  return (
    <ParamsFilterForm
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      showStatusFilter={false}
      roleLabel="Order"
      className={className}
    />
  );
};
