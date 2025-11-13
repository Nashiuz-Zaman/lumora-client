"use client";

import { BaseModal } from "./BaseModal";
import { InputField, ButtonBtn, ButtonBtnTrans } from "../shared";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";

export interface IRefundFormValues {
  reason: string;
}

interface IRefundModalProps {
  isOpen: boolean;
  isRefunding: boolean;
  onClose: () => void;
  onSubmit: (args: {
    data: IRefundFormValues;
    reset: UseFormReset<IRefundFormValues>;
    setError: (msg: string) => void;
  }) => void;
}

export const RefundModal = ({
  isOpen,
  isRefunding,
  onClose,
  onSubmit,
}: IRefundModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRefundFormValues>();

  const submitHandler: SubmitHandler<IRefundFormValues> = (data) => {
    onSubmit({ data, reset, setError });
  };

  const setError = (msg: string) => {
    // Optional: could integrate with React Hook Form's setError for field-level errors
    console.error(msg);
  };

  if (!isOpen) return null;

  return (
    <BaseModal
      className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full xl:w-[30rem]"
      condition={isOpen}
      closeFunction={() => {
        reset();
        onClose();
      }}
    >
      <form
        className="flex flex-col gap-4 modal-focus"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="text-xl font-semibold">Issue Refund</h2>

        <InputField
          labelText="Refund Reason"
          placeholder="Enter the reason for refund"
          {...register("reason", { required: "Refund reason is required" })}
          error={errors.reason?.message}
          required
          inputClassName="rounded-md"
          placeholderClassName="text-sm text-neutral-600"
          labelTextClassName="font-medium text-sm"
        />

        <div className="flex justify-end gap-4 pt-2 items-center">
          <ButtonBtnTrans
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </ButtonBtnTrans>

          <ButtonBtn
            type="submit"
            isLoading={isRefunding}
            className="!primaryClasses !py-2"
          >
            Submit
          </ButtonBtn>
        </div>
      </form>
    </BaseModal>
  );
};
