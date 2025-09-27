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

const CartStateProvider = ({ children }: ICartStateProviderProps) => {
  const { user, isLoading: isUserLoading } = useAuthState();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cart, setCart] = useState<TPopulatedCart>({ ...emptyCart });

  const isGuest = !user;

  const { data: userCartData, isFetching: userCartLoading } =
    useGetUserCartQuery(undefined, {
      skip: isUserLoading || !user,
      refetchOnMountOrArgChange: true,
    });

  const { data: guestCartData, isFetching: guestCartLoading } =
    useGetGuestCartQuery(undefined, {
      skip: isUserLoading || !isGuest,
    });

  // Track loading state
  useEffect(() => {
    setIsCartLoading(userCartLoading || guestCartLoading);
  }, [userCartLoading, guestCartLoading]);

  // Sync fetched cart data into state
  useEffect(() => {
    if (user?._id && userCartData?.data?.cart) {
      setCart(userCartData.data.cart);
    } else if (isGuest && guestCartData?.data?.cart) {
      setCart(guestCartData.data.cart);
    }
  }, [user?._id, isGuest, userCartData, guestCartData]);

  const value: ICartStateContext = {
    cart,
    setCart,
    isCartLoading,
    setIsCartLoading,
  };

  return <CartStateContext value={value}>{children}</CartStateContext>;
};

export default CartStateProvider;
