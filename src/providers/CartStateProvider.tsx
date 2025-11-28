"use client";

import { useAuthState } from "@/hooks";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  useGetUserCartQuery,
  useGetGuestCartQuery,
} from "@/libs/redux/apiSlices/cart/cartApiSlice";
import { emptyCart } from "@/constants";
import { TPopulatedCart } from "@/types/cart";

export interface ICartStateContext {
  cart: TPopulatedCart | null;
  setCart: Dispatch<SetStateAction<TPopulatedCart>>;
  isCartLoading: boolean;
  setIsCartLoading: Dispatch<SetStateAction<boolean>>;
}

// Create context with proper type
export const CartStateContext = createContext<ICartStateContext | undefined>(
  undefined
);

export interface ICartStateProviderProps {
  children: ReactNode;
}

export const CartStateProvider = ({ children }: ICartStateProviderProps) => {
  const { user, isLoading: isUserLoading } = useAuthState();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cart, setCart] = useState<TPopulatedCart>({ ...emptyCart });

  const {
    data: userCartData,
    isFetching: userCartLoading,
    refetch: refetchUserCart,
  } = useGetUserCartQuery(undefined, {
    skip: isUserLoading || !user,
  });

  const {
    data: guestCartData,
    isFetching: guestCartLoading,
    refetch: refetchGuestCart,
  } = useGetGuestCartQuery(undefined, {
    skip: isUserLoading || !!user,
  });

  // Track loading state
  useEffect(() => {
    setIsCartLoading(userCartLoading || guestCartLoading);
  }, [userCartLoading, guestCartLoading]);

  useEffect(() => {
    if (user && userCartData) {
      if (refetchUserCart) refetchUserCart();
    } else if (!user && guestCartData) {
      if (refetchGuestCart) refetchGuestCart();
    }
  }, [user, refetchGuestCart, refetchUserCart, userCartData, guestCartData]);

  // Sync fetched cart data into state
  useEffect(() => {
    if (user && userCartData?.data?.cart) {
      setCart(userCartData.data.cart);
    } else if (!user && guestCartData?.data?.cart) {
      setCart(guestCartData.data.cart);
    } else {
      setCart({ ...emptyCart });
    }
  }, [user, userCartData, guestCartData]);

  const value: ICartStateContext = {
    cart,
    setCart,
    isCartLoading,
    setIsCartLoading,
  };

  return <CartStateContext value={value}>{children}</CartStateContext>;
};


