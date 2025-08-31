import { ButtonBtn, LockIcon } from "@/components/shared";
import { PromoCode } from "./PromoCode";
import { formatPrice } from "@/utils";

interface Props {
  subtotal: number;
  discount: number;
  couponCode: string;
  tax: number;
  total: number;
  shippingFee: number;
}

export const OrderSummary = ({
  subtotal,
  discount,
  tax,
  total,
  shippingFee,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 sticky top-6 overflow-hidden">
      <div className="bg-gradient-to-br from-primary to-purple-500 px-6 py-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p className="text-white text-sm">Review your purchase</p>
      </div>
      <div className="px-6 py-6 space-y-6">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Shipping</span>
            <span className="font-medium text-secondary">
              {formatPrice(shippingFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Tax</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
        </div>

        {/* Promo Code */}
        <PromoCode discount={discount} />

        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-neutral-900">
              Total
            </span>
            <span className="text-2xl font-bold text-neutral-900">
              {formatPrice(total)}
            </span>
          </div>
          <div className="text-xs text-neutral-500 text-center mb-4">
            *Final price may vary based on your location
          </div>
        </div>

        <ButtonBtn className="!primaryClasses !rounded-full mx-auto">
          Secure Checkout
        </ButtonBtn>

        <div className="text-center space-y-3 text-xs">
          <div className="flex items-center justify-center gap-1">
            <LockIcon className="text-xl" /> <span>SSL Secured Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
