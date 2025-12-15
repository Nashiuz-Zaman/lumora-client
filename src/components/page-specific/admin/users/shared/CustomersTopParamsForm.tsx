"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@/components/shared";
import { ICustomerQueriesParams } from "@/hooks/useCustomersQueries";
import { IOrder } from "@/types";

export const CustomersTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IParamsFilterFormProps<ICustomerQueriesParams, IOrder>) => {
  return (
    <ParamsFilterForm
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      showStatusFilter={false}
      roleLabel="Customer"
      className={className}
    />
  );
};
