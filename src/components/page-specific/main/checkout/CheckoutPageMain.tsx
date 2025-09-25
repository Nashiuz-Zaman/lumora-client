"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartState } from "@/hooks";
import CustomerInfoForm, { CustomerInfoFormValues } from "./CustomerInfoForm";
import { useOrderActions } from "@/hooks";
import { usePlaceOrderMutation } from "@/libs/redux/apiSlices/orders/orderApiSlice";
import { showToast } from "@/utils";

export const CheckoutPageMain = () => {
  const { cart, isCartLoading } = useCartState();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrderFromCart } = useOrderActions();
  const [placeOrder] = usePlaceOrderMutation();

  useEffect(() => {
    if (!isCartLoading && !cart?._id) {
      router.replace("/cart");
    }
  }, [cart, isCartLoading, router]);

  const handleSubmit = async (data: CustomerInfoFormValues) => {
    console.log(data);
    if (!cart) return;

    setIsSubmitting(true);
    try {
      // Create order payload using your hook
      const orderPayload = createOrderFromCart(cart, data);

      console.log("Order payload:", orderPayload);

      // Send to API via RTK mutation
      const res = await placeOrder(orderPayload).unwrap();

      const paymentUrl = res?.data?.paymentUrl;

      if (!paymentUrl)
        return showToast({ message: "Something went wrong", type: "error" });

      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Failed to place order:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <CustomerInfoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};
