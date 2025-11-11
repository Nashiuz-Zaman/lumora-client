"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@/components/shared";
import { IOrderQueriesParams } from "@/hooks";
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
