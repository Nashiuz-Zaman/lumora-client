"use client";

import React from "react";
import { LoadingSpinner, NoData } from "@/components/shared";
import { CurProducts } from "./CurProducts";
import { OrderActivity } from "./OrderActivity";
import { OrderHeaderTrackingPage } from "./OrderHeaderTrackingPage";
import { ProgressTracker } from "./ProgressTracker";
import { TTrackOrderData } from "@/types";

interface IOrderTrackingPanelProps {
  orderData?: TTrackOrderData;
  isLoading?: boolean;
}

export const orderProgressSteps = [
  {
    id: 1,
    title: "Pending",
    icon: "material-symbols:hourglass-empty",
  },
  {
    id: 2,
    title: "Confirmed",
    icon: "mdi:check-circle-outline",
  },
  {
    id: 3,
    title: "Shipped",
    icon: "mdi:truck-fast-outline",
  },
  {
    id: 4,
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

  if (!orderData) {
    return (
      <div className="h-full bg-neutral-50 relative">
        <NoData centered />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-neutral-200 rounded-md bg-white">
      {/* Header */}
      <OrderHeaderTrackingPage order={orderData} />

      {/* Progress Tracker */}
      <ProgressTracker
        stages={orderProgressSteps}
        activeId={orderData.status}
        className="my-14 mx-auto"
      />

      {/* Ordered Products */}
      <CurProducts data={orderData.items} />

      {/* Order Activity */}
      <OrderActivity activities={orderData.activities} />
    </div>
  );
};
