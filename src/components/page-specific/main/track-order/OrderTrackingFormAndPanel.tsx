"use client";

import { useSearchParams } from "next/navigation";

import { OrderTrackingForm } from "./OrderTrackingForm";
import { OrderTrackingPanel } from "./OrderTrackingPanel";
import { useTrackOrderQuery } from "@/libs/redux/apiSlices/orders/orderApiSlice";

export const OrderTrackingFormAndPanel = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isFetching } = useTrackOrderQuery(
    { orderId: id ?? "" },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const order = data?.success ? data.data?.order : undefined;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[25rem_auto] gap-10">
      <OrderTrackingForm />
      <OrderTrackingPanel order={order} isLoading={isFetching} />
    </div>
  );
};
