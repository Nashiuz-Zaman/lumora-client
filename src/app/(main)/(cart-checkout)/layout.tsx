import { ReactNode } from "react";
import CartCheckoutLayoutMain from "@layout-specific/cart-checkout/CartChectkoutLayoutMain";

const Layout = ({ children }: { children: ReactNode }) => {
  return <CartCheckoutLayoutMain>{children}</CartCheckoutLayoutMain>;
};

export default Layout;
