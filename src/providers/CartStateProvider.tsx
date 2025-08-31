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
import { UserRoles } from "@/constants";
import { TPopulatedCart } from "@/types/cart";

export interface ICartStateContext {
  cart: TPopulatedCart | null;
  setCart: Dispatch<SetStateAction<TPopulatedCart | null>>;
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

const CartStateProvider = ({ children }: ICartStateProviderProps) => {
  const { user, isLoading: isUserLoading } = useAuthState();
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cart, setCart] = useState<TPopulatedCart | null>(null);

  const isCustomer = user?.role?.name === UserRoles.customer;
  const isGuest = !user;

  const { data: userCartData, isFetching: userCartLoading } =
    useGetUserCartQuery(undefined, {
      skip: isUserLoading || !isCustomer,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  const { data: guestCartData, isFetching: guestCartLoading } =
    useGetGuestCartQuery(undefined, {
      skip: isUserLoading || !isGuest,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  // Track loading state
  useEffect(() => {
    if (!isUserLoading) {
      if (!isCartLoading) {
        if (userCartLoading || guestCartLoading) setIsCartLoading(true);
      } else if (isCartLoading) {
        if (!userCartLoading && !guestCartLoading) setIsCartLoading(false);
      }
    }
  }, [isUserLoading, userCartLoading, guestCartLoading, isCartLoading]);

  // Sync fetched cart data into state
  useEffect(() => {
    if (isCustomer && userCartData?.data) {
      setCart(userCartData.data);
    } else if (isGuest && guestCartData?.data) {
      setCart(guestCartData.data);
    }
  }, [isCustomer, isGuest, userCartData, guestCartData]);

  const value: ICartStateContext = {
    cart,
    setCart,
    isCartLoading,
    setIsCartLoading,
  };

  return <CartStateContext value={value}>{children}</CartStateContext>;
};

export default CartStateProvider;
