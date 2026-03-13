"use client";

import { createContext, ReactNode } from "react";
import { useGetCartQuery } from "@/libs/redux/apiSlices/cart.api.slice";
import { emptyCart } from "@/constants";
import { TPopulatedCart } from "@/types/cart";

export interface ICartStateContext {
  cart: TPopulatedCart;
  isCartLoading: boolean;
}

export const CartStateContext = createContext<ICartStateContext | undefined>(
  undefined,
);

export interface ICartStateProviderProps {
  children: ReactNode;
}

export const CartStateProvider = ({ children }: ICartStateProviderProps) => {
  const { isLoading, data } = useGetCartQuery();

  const value: ICartStateContext = {
    cart: data?.data?.cart ?? emptyCart,
    isCartLoading: isLoading,
  };

  return <CartStateContext value={value}>{children}</CartStateContext>;
};
