import { useCallback } from "react";
import { OrderStatus } from "@/constants";
import { ICart, IOrder, TPopulatedCartItem } from "@/types";

export const useOrderActions = () => {
  const createOrderFromCart = useCallback(
    (
      cart: ICart<TPopulatedCartItem>,
      customerInfo: {
        name: string;
        email: string;
        phone?: string;
        deliveryAddress: string;
      }
    ): IOrder => {
      return {
        cartId: cart._id as string,
        user: cart.user,
        name: customerInfo.name,
        // backend will check if there is a customer by this email if there is user will be set to that person
        email: customerInfo.email,
        phone: customerInfo.phone,
        deliveryAddress: customerInfo.deliveryAddress,
        subtotal: cart.subtotal ?? 0,
        total: cart.total ?? 0,
        shippingFee: cart.shippingFee ?? 0,
        discount: cart.discount ?? 0,
        tax: cart.tax ?? 0,
        items: cart.items,
        couponCode: cart.couponCode ?? "",
        status: OrderStatus.Pending,
        activities: [
          {
            time: new Date(),
            status: OrderStatus.Pending,
          },
        ],
      };
    },
    []
  );

  return { createOrderFromCart };
};
