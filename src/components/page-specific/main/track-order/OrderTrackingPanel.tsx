"use client";

import React from "react";
import { LoadingSpinner } from "@/components/shared";
import { CurProducts } from "./CurProducts";
import { OrderActivity } from "./OrderActivity";
import { OrderHeaderTrackingPage } from "./OrderHeaderTrackingPage";
import { ProgressTracker } from "./ProgressTracker";
import { UserAddress } from "./UserAddress";
import { IOrder } from "@/types";

interface OrderTrackingPanelProps {
  order?: IOrder;
  isLoading?: boolean;
}

export const OrderTrackingPanel = ({
  order,
  isLoading = false,
}: OrderTrackingPanelProps) => {
  if (isLoading) {
    return (
      <div className="h-80 relative">
        <LoadingSpinner centered />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-80 grid place-content-center bg-neutral-100">
        <p className="text-neutral-400 text-lg text-center">
          Search for an order to show progress
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-neutral-200 rounded-md bg-white">
      {/* Header */}
      <OrderHeaderTrackingPage order={order} />

      {/* Progress Tracker */}
      <ProgressTracker stage={order.status} className="mt-20 mb-6" />

      {/* Order Activity */}
      <OrderActivity activities={order.activities} />

      {/* Ordered Products */}
      <CurProducts data={order.items} />

      {/* Address Info */}
      <UserAddress data={order} />
    </div>
  );
};
