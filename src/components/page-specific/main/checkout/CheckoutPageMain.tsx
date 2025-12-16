"use client";

// React & Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Hooks
import { useCartState, useModal, useOrderActions } from "@/hooks";

// Components
import { CustomerInfoForm } from "./CustomerInfoForm";

// Redux
import { usePlaceOrderMutation } from "@/libs/redux/apiSlices/orders/orderApiSlice";

// Utils
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { UseFormSetError } from "react-hook-form";
import { ICustomerInfoFormValues } from "@/types";
import { DummyPaymentGuideModal } from "@/components/modals";

export const CheckoutPageMain = () => {
  const { cart, isCartLoading } = useCartState();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrderFromCart } = useOrderActions();
  const [placeOrder] = usePlaceOrderMutation();
  const { isModalOpen: isGuideModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!isCartLoading && !cart?._id) {
      router.replace("/cart");
    }
  }, [cart, isCartLoading, router]);

  useEffect(() => {
    if (
      !isGuideModalOpen &&
      !isCartLoading &&
      Array.isArray(cart?.items) &&
      cart?.items.length > 0
    ) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartLoading, JSON.stringify(cart?.items)]);

  const handlePlaceOrder = catchAsyncGeneral(
    async (args) => {
      if (!args || !cart) return;

      const data = args.data as ICustomerInfoFormValues;
      setIsSubmitting(true);

      // Build order payload
      const orderPayload = createOrderFromCart(cart, data);

      // Send to backend
      const res = await placeOrder(orderPayload).unwrap();

      const paymentUrl = res?.data?.paymentUrl;

      if (!paymentUrl)
        return showToast({
          message: "Something went wrong",
          type: "error",
        });

      window.location.href = paymentUrl;
    },
    {
      handleError: "function",
      onError(_error, args, message) {
        if (!args) return;
        const setError =
          args.setError as UseFormSetError<ICustomerInfoFormValues>;
        setError("root", { message });
      },
      onFinally() {
        setIsSubmitting(false);
      },
    }
  );

  return (
    <div>
      <DummyPaymentGuideModal isOpen={isGuideModalOpen} onClose={closeModal} />
      <CustomerInfoForm
        onSubmit={handlePlaceOrder}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
