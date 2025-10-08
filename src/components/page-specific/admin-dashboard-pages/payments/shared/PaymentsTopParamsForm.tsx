"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@/components/shared";
import { IPaymentQueriesParams } from "@/hooks/usePaymentQueries";
import { IPayment } from "@/types/payment";

export const PaymentsTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IParamsFilterFormProps<IPaymentQueriesParams, IPayment>) => {
  return (
    <ParamsFilterForm
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      showStatusFilter={false}
      roleLabel="Payment"
      className={className}
    />
  );
};
