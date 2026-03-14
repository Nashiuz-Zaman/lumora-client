"use client";

// React & Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Hooks
import { useModal } from "@/hooks/useModal";
import { useOrderActions } from "@/hooks/useOrderActions";

// Components
import { CustomerInfoForm } from "./CustomerInfoForm";

// Redux
import { usePlaceOrderMutation } from "@apiSlices/order.api.slice";

// Utils
import { catchAsyncGeneral } from "@/utils/catchAsyncGeneral";
import { showToast } from "@/utils/showToast";

// Types
import { UseFormSetError } from "react-hook-form";
import { ICustomerInfoFormValues } from "@/types";
import { DummyPaymentGuideModal } from "@modals/DummyPaymentGuideModal";
import { useCartState } from "@/hooks/useCartState";

export const CheckoutPageMain = () => {
  const { cart, isCartBusy } = useCartState();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrderFromCart } = useOrderActions();
  const [placeOrder] = usePlaceOrderMutation();
  const { isModalOpen: isGuideModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!isCartBusy && !cart?._id) {
      router.replace("/cart");
    }
  }, [cart, isCartBusy, router]);

  useEffect(() => {
    if (
      !isGuideModalOpen &&
      !isCartBusy &&
      Array.isArray(cart?.items) &&
      cart?.items.length > 0
    ) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartBusy, JSON.stringify(cart?.items)]);

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
    },
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
