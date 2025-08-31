"use client";

import { CartItemList } from "./CartItemList";
import { useCartState } from "@/hooks";
import EmptyPageLoader from "@/components/shared/EmptyPageLoader";

export const CartPageMain = () => {
  const { isCartLoading } = useCartState();

  if (isCartLoading) return <EmptyPageLoader />;

  return <CartItemList />;
};
