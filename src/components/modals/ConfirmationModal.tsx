"use client";

type ConfirmationModalProps = {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = ({
  show,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  if (!show) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[500] w-[90%] md:w-[28rem] text-sm xl:text-base">
      <p className="[font-size:inherit] font-semibold mb-6">{message}</p>

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md !dangerClasses"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

