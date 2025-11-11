"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@/components/shared";

import { IReturnRequestQueriesParams } from "@/hooks/useReturnRequestQueries";
import { IReturnRequest } from "@/types";

export const ReturnsTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IParamsFilterFormProps<IReturnRequestQueriesParams, IReturnRequest>) => {
  return (
    <ParamsFilterForm
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      showStatusFilter={false}
      roleLabel="Return Request"
      className={className}
    />
  );
};
