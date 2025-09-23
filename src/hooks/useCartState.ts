"use client";

import { CartStateContext, ICartStateContext } from "@/providers";
import { useContext } from "react";

export const useCartState = (): ICartStateContext => {
  const context = useContext(CartStateContext);

  if (!context) {
    throw new Error("useCartState must be used within a <CartStateProvider>");
  }

  return context;
};
