import { CartPageMain } from "@/components/page-specific/main/cart/CartPageMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Lumora.com",
};

const CartPage = () => {
  return <CartPageMain />;
};

export default CartPage;
