"use client";

import { BaseModal } from "./BaseModal";

interface IConfirmationModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isAnimated?: boolean;
}

export const ConfirmationModal = ({
  show,
  message,
  onConfirm,
  onCancel,
  isAnimated,
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
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </BaseModal>
  );
};
