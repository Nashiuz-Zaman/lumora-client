"use client";

import { IParamsFilterFormProps, ParamsFilterForm } from "@/components/shared";
import { ICouponQueryParams } from "@/hooks";
import { ICoupon } from "@/types";

export const CouponTopParamsForm = ({
  params,
  setParams,
  onSubmit,
  sortOptions,
  className,
}: IParamsFilterFormProps<ICouponQueryParams, ICoupon>) => {
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
