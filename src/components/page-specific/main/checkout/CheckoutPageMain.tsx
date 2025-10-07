"use client";

// React & Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Hooks
import { useCartState, useOrderActions } from "@/hooks";

// Components
import { ICustomerInfoFormValues, CustomerInfoForm } from "./CustomerInfoForm";

// Redux
import { usePlaceOrderMutation } from "@/libs/redux/apiSlices/orders/orderApiSlice";

// Utils
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { UseFormSetError } from "react-hook-form";

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

  const handlePlaceOrder = catchAsyncGeneral(
    async (args) => {
      if (!args || !cart) return;
      const data = args.data as ICustomerInfoFormValues;
      setIsSubmitting(true);

      // Create order payload using your hook
      const orderPayload = createOrderFromCart(cart, data);

      // Send to API via RTK mutation
      const res = await placeOrder(orderPayload).unwrap();

      const paymentUrl = res?.data?.paymentUrl;

      if (!paymentUrl)
        return showToast({ message: "Something went wrong", type: "error" });

      window.location.href = paymentUrl;
    },
    {
      handleError: "function",
      onError(_error, args, message) {
        if (!args) return;
        const setError =
          args.setError as UseFormSetError<ICustomerInfoFormValues>;
        setError("root", { message: message });
      },
      onFinally() {
        setIsSubmitting(false);
      },
    }
  );

  return (
    <div>
      <CustomerInfoForm
        onSubmit={handlePlaceOrder}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
