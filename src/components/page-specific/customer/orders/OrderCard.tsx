import { IOrder } from "@/types";
import {
  formatDateTime,
  formatPrice,
  getOrderStatusLabel,
  getOrderStatusTextColor,
} from "@/utils";
import { useRouter } from "next/navigation";

import {
  ButtonBtn,
  GoToIcon,
  LinkBtn,
  LinkBtnTrans,
  LocationIcon,
  WarningIcon,
} from "@/components/shared";
import { OrderStatus } from "@/constants";
import { OrderItemCard } from "./OrderItemCard";

interface IOrderCardProps {
  order: IOrder;
}

export const OrderCard = ({ order }: IOrderCardProps) => {
  const router = useRouter();

  const goToOrderDetails = () => {
    router.push(`/customer/my-orders/${order.orderId}`);
  };

  return (
    <div
      onClick={goToOrderDetails}
      className="bg-white border cursor-pointer border-neutral-100 rounded-lg shadow-md p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">
            Order #{order.orderId}
          </h2>

          <p className="text-sm text-neutral-500">
            Placed on {formatDateTime(order.createdAt!)} • {order.items.length}{" "}
            items
          </p>
        </div>

        <p className={`text-xs font-medium px-3 py-1 rounded-full`}>
          Status:{" "}
          <span className={getOrderStatusTextColor(order.status)}>
            {getOrderStatusLabel(order.status)}
          </span>
        </p>
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 2md:grid-cols-[2fr_1fr] gap-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[220px] overflow-y-auto">
          {order.items.map((item, i) => (
            <OrderItemCard key={i} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 h-max">
          <h3 className="font-semibold text-neutral-800 mb-3">Order Summary</h3>

          {/* Subtotal */}
          <div className="flex justify-between text-sm text-neutral-700 mb-1">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>

          {/* Shipping */}
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

          {/* Tax */}
          {order.tax !== undefined && (
            <div className="flex justify-between text-sm text-neutral-700 mb-1">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
          )}

          {/* Discount */}
          {order.discount !== undefined && (
            <div className="flex justify-between text-sm text-neutral-700 mb-1">
              <span>Discount</span>
              <span className="text-red-600">
                -{formatPrice(order.discount)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between font-bold text-lg text-neutral-800 mt-3">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        {/* View invoice link */}
        <LinkBtnTrans
          href={order.invoice!}
          target="_blank"
          isExternal={true}
          className="text-primary font-medium hover:underline"
        >
          View Invoice <GoToIcon />
        </LinkBtnTrans>

        {/* Right side buttons */}
        <div className="flex space-x-3">
          <LinkBtn
            href={`/track-order?id=${order.orderId}`}
            className="primaryClasses !py-2 !rounded-full !px-4"
          >
            <LocationIcon />
            Track Order
          </LinkBtn>

          {order?.status < OrderStatus.Shipped && (
            <ButtonBtn className="dangerClasses !rounded-full !px-4 !py-2">
              <WarningIcon /> Cancel
            </ButtonBtn>
          )}
        </div>
      </div>
    </div>
  );
};
