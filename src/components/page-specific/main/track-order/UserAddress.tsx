"use client";

import React from "react";

interface UserAddressData {
  name?: string;
  deliveryAddress?: string;
  phone?: string;
  email?: string;
  additionalNotes?: string;
}

interface UserAddressProps {
  data?: UserAddressData;
}

export const UserAddress = ({ data }: UserAddressProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-4 md:px-6 lg:px-8 py-6">
      {/* Billing Address */}
      <div className="border border-neutral-200 rounded-md p-4 text-sm space-y-3">
        <h2 className="text-base lg:text-lg font-semibold mb-2">
          Billing Address
        </h2>
        <p className="font-medium">{data?.name || "N/A"}</p>
        <p className="text-neutral-600">{data?.deliveryAddress || "N/A"}</p>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          <span className="text-neutral-600">{data?.phone || "N/A"}</span>
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <span className="text-neutral-600">{data?.email || "N/A"}</span>
        </p>
      </div>

      {/* Shipping Address */}
      <div className="border border-neutral-200 rounded-md p-4 text-sm space-y-3">
        <h2 className="text-base lg:text-lg font-semibold mb-2">
          Shipping Address
        </h2>
        <p className="font-medium">{data?.name || "N/A"}</p>
        <p className="text-neutral-600">{data?.deliveryAddress || "N/A"}</p>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          <span className="text-neutral-600">{data?.phone || "N/A"}</span>
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <span className="text-neutral-600">{data?.email || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};
