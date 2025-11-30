"use client";

import React from "react";
import { LoadingSpinner } from "@/components/shared";
import { CurProducts } from "./CurProducts";
import { OrderActivity } from "./OrderActivity";
import { OrderTrackingHeader } from "./OrderTrackingHeader";
import { ProgressTracker } from "./ProgressTracker";
import { TTrackOrderData } from "@/types";
import { OrderStatus } from "@/constants";

interface IOrderTrackingPanelProps {
  orderData?: TTrackOrderData;
  isLoading?: boolean;
}

export const orderProgressSteps = [
  {
    id: OrderStatus.Pending,
    title: "Pending",
    icon: "material-symbols:hourglass-empty",
  },
  {
    id: OrderStatus.Confirmed,
    title: "Confirmed",
    icon: "mdi:check-circle-outline",
  },
  {
    id: OrderStatus.Shipped,
    title: "Shipped",
    icon: "mdi:truck-fast-outline",
  },
  {
    id: OrderStatus.Delivered,
    title: "Delivered",
    icon: "mdi:package-variant-closed-check",
  },
];

export const OrderTrackingPanel = ({
  orderData,
  isLoading = false,
}: IOrderTrackingPanelProps) => {
  if (isLoading) {
    return (
      <div className="h-full relative">
        <LoadingSpinner centered />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-neutral-200 rounded-md bg-white">
      {/* Header */}
      <OrderTrackingHeader order={orderData} />

      {/* Progress Tracker */}
      <ProgressTracker
        stages={orderProgressSteps}
        activeId={orderData?.status ?? 0}
        className="my-14 mx-auto"
      />

      {/* Ordered Products */}
      <CurProducts data={orderData?.items ?? []} />

      {/* Order Activity */}
      <OrderActivity activities={orderData?.activities ?? []} />
    </div>
  );
};
