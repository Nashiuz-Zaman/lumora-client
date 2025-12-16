"use client";

import { BaseModal } from "./BaseModal";

interface IDummyPaymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DummyPaymentGuideModal = ({
  isOpen,
  onClose,
}: IDummyPaymentGuideModalProps) => {
  return (
    <BaseModal
      condition={isOpen}
      closeFunction={onClose}
      allowCloseOnOutsideClick={false}
      className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full"
    >
      <div className="space-y-3 text-sm leading-relaxed text-neutral-700">
        <p className="font-semibold text-primary-dark text-lg">
          Dummy Payment Guide
        </p>

        <p>SSLCommerz is currently running in sandbox mode.</p>

        <p>To make a dummy payment, please follow these steps:</p>

        <ol className="list-decimal list-inside space-y-1">
          <li>
            Go to <strong>Mobile Banking</strong>
          </li>
          <li>
            Select <strong>bKash</strong>
          </li>
          <li>
            Choose <strong>Success</strong> or other options to see different
            payment outcomes.
          </li>
        </ol>
      </div>
    </BaseModal>
  );
};
