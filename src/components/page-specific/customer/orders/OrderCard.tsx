import React from "react";
import { IOrder } from "@/types";
import { formatDateTime, formatPrice } from "@/utils";
import Image from "next/image";

interface IOrderCardProps {
  order: IOrder;
}

export const OrderCard = ({ order }: IOrderCardProps) => {
  return (
    <div className="bg-white border border-neutral-100 rounded-lg shadow-md p-6 my-8">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">
            Order #{order.orderId}
          </h2>

          <p className="text-sm text-neutral-500">
            Placed on{" "}
            {formatDateTime(order.createdAt!)}{" "}
            • {order.items.length} items
          </p>
        </div>

        <span className="bg-neutral-100 text-neutral-700 text-xs font-medium px-3 py-1 rounded-full">
          {order.status}
        </span>
      </div>

      {/* ---------------- ITEMS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {order.items.map((item, i) => (
          <div
            key={`key-order-item-${i}`}
            className="flex items-center p-4 bg-neutral-50 rounded-lg border border-neutral-200"
          >
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden relative">
                {item.product?.defaultImage && (
                  <Image
                    src={item.product.defaultImage}
                    alt={item.product.title || "Product Image"}
                    fill
                    className="object-cover rounded-full"
                    sizes="40px" // optional, since the container is 40x40
                  />
                )}
              </div>
            </div>
            <div>
              <p className="font-medium text-neutral-700">
                {item.product?.title}
              </p>
              {/* {item.variant && (
                <p className="text-sm text-neutral-500">
                  {item.variant.color} • {item.variant.name}
                </p>
              )} */}
              <p className="font-semibold text-neutral-800">
                {formatPrice(item.variant.price!)}
              </p>
            </div>
          </div>
        ))}

        {/* ---------------- ORDER SUMMARY ---------------- */}
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
          <h3 className="font-semibold text-neutral-800 mb-3">Order Summary</h3>

          <div className="flex justify-between text-sm text-neutral-700 mb-1">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>

          {order.shippingFee !== undefined && (
            <div className="flex justify-between text-sm text-neutral-700 mb-1">
              <span>Shipping</span>
              <span className={order.shippingFee === 0 ? "text-green-600" : ""}>
                {order.shippingFee === 0
                  ? "Free"
                  : formatPrice(order.shippingFee)}
              </span>
            </div>
          )}

          {order.tax !== undefined && (
            <div className="flex justify-between text-sm text-neutral-700 mb-1">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
          )}

          {order.discount !== undefined && order.discount > 0 && (
            <div className="flex justify-between text-sm text-neutral-700 mb-1">
              <span>Discount</span>
              <span className="text-red-600">
                -{formatPrice(order.discount)}
              </span>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg text-neutral-800 mt-3">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* ---------------- ACTION BUTTONS ---------------- */}
      <div className="flex space-x-3 w-max ml-auto">
        <button className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Track Order
        </button>

        <button className="px-6 py-2 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2">
          Cancel
        </button>
      </div>
    </div>
  );
};
