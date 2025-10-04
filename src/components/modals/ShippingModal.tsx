"use client";

import { BaseModal } from "./BaseModal";
import { Inputfield, ButtonBtn, ButtonBtnTrans } from "../shared";

interface IShippingModalProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (args: { e: React.FormEvent<HTMLFormElement> }) => void;
}

export const ShippingModal = ({
  isLoading,
  isOpen,
  onClose,
  onSubmit,
}: IShippingModalProps) => {
  return (
    <BaseModal
      className="bg-white p-6 rounded-xl shadow-md !w-full max-w-[35rem]"
      condition={isOpen}
      closeFunction={onClose}
      allowCloseOnOutsideClick={false}
    >
      <form className="space-y-4" onSubmit={(e) => onSubmit({ e })}>
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <Inputfield
          labelText="Tracking Number"
          name="shippingTrackingNumber"
          placeholder="Enter tracking number"
          required
        />

        <Inputfield
          labelText="Carrier"
          name="shippingCarrier"
          placeholder="Enter carrier name"
          required
        />

        <Inputfield
          labelText="Estimated Delivery Date"
          name="estimatedDelivery"
          type="datetime-local"
          required
        />

        <div className="flex justify-end items-center gap-5 pt-4">
          <ButtonBtnTrans type="button" onClick={onClose}>
            Cancel
          </ButtonBtnTrans>
          <ButtonBtn isLoading={isLoading} className="!primaryClasses">
            Save
          </ButtonBtn>
        </div>
      </form>
    </BaseModal>
  );
};
