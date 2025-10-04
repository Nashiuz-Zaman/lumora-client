"use client";

import { BaseModal } from "./BaseModal";
import { ButtonBtn, ButtonBtnTrans, TextArea } from "@/components/shared";

interface ICancelOrderModalAdminProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (args: { e: React.FormEvent<HTMLFormElement> }) => void;
  isLoading?: boolean;
  defaultValues?: {
    reason?: string;
  };
}

export const CancelOrderModalAdmin = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  defaultValues = {},
}: ICancelOrderModalAdminProps) => {
  return (
    <BaseModal
      condition={isOpen}
      closeFunction={onClose}
      className="sm:w-[480px] bg-white rounded-lg p-6 shadow-md"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ e });
        }}
        className="space-y-6"
      >
        <h3 className="text-lg font-medium">Cancel Order as Admin</h3>

        <TextArea
          labelText="Reason for cancellation"
          name="reason"
          required
          placeholder="Provide a reason..."
          defaultValue={defaultValues.reason || ""}
        />

        <div className="flex justify-end gap-4 pt-2">
          <ButtonBtnTrans type="button" onClick={onClose}>
            Cancel
          </ButtonBtnTrans>
          <ButtonBtn className="!primaryClasses" isLoading={isLoading}>
            Confirm Cancel
          </ButtonBtn>
        </div>
      </form>
    </BaseModal>
  );
};
