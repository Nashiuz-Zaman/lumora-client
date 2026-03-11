"use client";

import { useAuthState } from "@/hooks";
import {
  createContext,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import {
  useGetUserCartQuery,
  useGetGuestCartQuery,
} from "@/libs/redux/apiSlices/cart/cartApiSlice";
import { emptyCart } from "@/constants";
import { TPopulatedCart } from "@/types/cart";

export interface ICartStateContext {
  cart: TPopulatedCart;
  isCartLoading: boolean;

  // optional local loading override (useful for optimistic UI)
  setIsCartLoading: Dispatch<SetStateAction<boolean>>;
}

export const CartStateContext = createContext<ICartStateContext | undefined>(
  undefined,
);

export interface ICartStateProviderProps {
  children: ReactNode;
}

export const CartStateProvider = ({ children }: ICartStateProviderProps) => {
  const { user, isLoading: isUserLoading } = useAuthState();

  // optional manual loading state for mutations
  const [manualLoading, setIsCartLoading] = useState(false);

  // User cart query
  const userCartQuery = useGetUserCartQuery(undefined, {
    skip: isUserLoading || !user,
  });

  // Guest cart query
  const guestCartQuery = useGetGuestCartQuery(undefined, {
    skip: isUserLoading || !!user,
  });

  const cart = useMemo(() => {
    if (user) {
      return userCartQuery.data?.data ?? emptyCart;
    }

    return guestCartQuery.data?.data ?? emptyCart;
  }, [user, userCartQuery.data, guestCartQuery.data]);

  const isCartLoading = useMemo(() => {
    if (manualLoading) return true;

    if (user) {
      return userCartQuery.isFetching;
    }

    return guestCartQuery.isFetching;
  }, [
    manualLoading,
    user,
    userCartQuery.isFetching,
    guestCartQuery.isFetching,
  ]);

  const value: ICartStateContext = {
    cart,
    isCartLoading,
    setIsCartLoading,
  };

  return (
    <CartStateContext value={value}>
      {children}
    </CartStateContext>
  );
};
