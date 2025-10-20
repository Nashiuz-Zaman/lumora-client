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
      <ProgressTracker status={orderData.status} className="mt-20 mb-6" />

      {/* Ordered Products */}
      <CurProducts data={orderData.items} />

      {/* Order Activity */}
      <OrderActivity activities={orderData.activities} />
    </div>
  );
};
