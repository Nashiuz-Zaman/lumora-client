import { InnerContainer } from "@/components/shared";
import React from "react";
import ShoppingCart from "./ShoppingCart";
import CartTotals from "./CartTotals";

const CartPageMain = () => {
  return (
    <InnerContainer className="grid grid-cols-1 xl:grid-cols-[50rem_20rem] 2xl:grid-cols-[60rem_25rem] gap-5 w-full py-20">
      <ShoppingCart />

      <CartTotals />
    </InnerContainer>
  );
};

export default CartPageMain;
