"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@/components/shared";
import { ICouponQueriesParams } from "@/hooks";
import { ICoupon } from "@/types";

export const CouponTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IParamsFilterFormProps<ICouponQueriesParams, ICoupon>) => {
  return (
    <ParamsFilterForm
      params={params}
      setParams={setParams}
      onSubmit={onSubmit}
      sortOptions={sortOptions}
      showStatusFilter={false}
      roleLabel="Coupon"
      className={className}
    />
  );
};
