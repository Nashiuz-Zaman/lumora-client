import CartCheckoutLayoutMain from "@/components/layout-specific/cart-checkout/CartChectkoutLayoutMain";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <CartCheckoutLayoutMain>{children}</CartCheckoutLayoutMain>;
};

export default Layout;
