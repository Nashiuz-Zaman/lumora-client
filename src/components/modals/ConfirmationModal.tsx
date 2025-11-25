"use client";

import { ButtonBtn } from "../shared";
import { BaseModal } from "./BaseModal";

interface IConfirmationModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isAnimated?: boolean;
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  show,
  message,
  onConfirm,
  onCancel,
  isAnimated,
  isLoading = false,
}: IConfirmationModalProps) => {
  return (
    <BaseModal
      noCloseBtn={true}
      condition={show}
      isAnimated={isAnimated}
      closeFunction={onCancel}
      className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-[90%] md:w-[28rem] text-sm sm:text-base"
    >
      <p className="font-semibold mb-6">{message}</p>

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 transition"
        >
          No
        </button>

        <ButtonBtn
          isLoading={isLoading}
          className="!dangerClasses !px-4 !py-2 !rounded-md"
          onClick={onConfirm}
        >
          Yes
        </ButtonBtn>
      </div>
    </BaseModal>
  );
};
