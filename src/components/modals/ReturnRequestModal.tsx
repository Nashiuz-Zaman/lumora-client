"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Components
import { BaseModal } from "@/components/modals";
import {
  ButtonBtn,
  InputField,
  LoadingSpinner,
  ErrorMessage,
} from "@/components/shared";

// Redux
import {
  setIsRequestModalOpen,
  setRequestId,
} from "@/libs/redux/features/returnRequest/returnRequest";
import { setBackdropOpen } from "@/libs/redux/features/backdrop/backdropSlice";

// Hooks
import {
  useApproveReturnRequestMutation,
  useGetReturnRequestQuery,
  useRejectReturnRequestMutation,
} from "@/libs/redux/apiSlices/returnRequest/returnRequestApiSlice";

// Utils
import { catchAsyncGeneral, formatPrice, showToast } from "@/utils";
import { ReturnRequestStatus } from "@/constants";
import type { TRootState } from "@/libs/redux/store";

interface IRefundForm {
  refundAmount: number;
}

export const ReturnRequestModal = () => {
  const dispatch = useDispatch();
  const { requestId, isRequestModalOpen } = useSelector(
    (state: TRootState) => state.returnRequest
  );

  const [approveRequest, { isLoading: isApproving }] =
    useApproveReturnRequestMutation();
  const [rejectReturnRequest, { isLoading: isRejecting }] =
    useRejectReturnRequestMutation();

  const [issueFullRefund, setIssueFullRefund] = useState(true);

  const { data, isFetching, isError } = useGetReturnRequestQuery(
    { id: requestId as string, populate: "order" },
    { skip: !isRequestModalOpen || !requestId, refetchOnMountOrArgChange: true }
  );

  const request = data?.success ? data.data?.returnRequest : undefined;
  const orderTotal = request?.order?.total ?? 0;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IRefundForm>({
    defaultValues: { refundAmount: +orderTotal },
  });

  // Autofill full refund when toggled
  useEffect(() => {
    if (isRequestModalOpen && orderTotal && issueFullRefund) {
      setValue("refundAmount", orderTotal);
    } else if (!issueFullRefund) {
      setValue("refundAmount", 0);
    }

    return () => {
      if (issueFullRefund === false) setIssueFullRefund(true);
    };
  }, [isRequestModalOpen, orderTotal, issueFullRefund, setValue]);

  const closeFunction = () => {
    dispatch(setIsRequestModalOpen(false));
    dispatch(setRequestId(null));
    dispatch(setBackdropOpen(false));
    reset();
  };

  const handleApprove = catchAsyncGeneral(async (args) => {
    const data = args?.data as IRefundForm;

    const amount = issueFullRefund ? orderTotal : Number(data.refundAmount);

    const res = await approveRequest({
      id: requestId as string,
      refundAmount: amount,
    }).unwrap();

    if (res.success) {
      showToast({ message: res.message });
      closeFunction();
    }
  });

  const handleReject = catchAsyncGeneral(async () => {
    const res = await rejectReturnRequest({
      id: requestId as string,
    }).unwrap();

    if (res.success) {
      showToast({ message: res.message });
      closeFunction();
    }
  });

  return (
    <BaseModal
      className="max-h-[90vh] overflow-y-auto min-h-[30rem] max-w-[60rem] !w-full bg-white p-10 rounded-xl flex flex-col gap-6"
      condition={isRequestModalOpen}
      closeFunction={closeFunction}
    >
      {isFetching && <LoadingSpinner centered />}

      {!isFetching && (isError || !request) && (
        <ErrorMessage centered text="Failed to load return request details." />
      )}

      {!isFetching && request && (
        <>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Return Request Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-1">Order ID</h4>
              <p className="text-neutral-700">{request.orderId || "—"}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Customer</h4>
              <p className="text-neutral-700">
                {request?.order?.name || "—"} ({request?.order?.email || "—"})
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Order Total</h4>
              <p className="text-neutral-700">{formatPrice(orderTotal)}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Reason</h4>
              <p className="text-neutral-700">{request.reason || "—"}</p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-neutral-700 whitespace-pre-line">
                {request.description || "—"}
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold mb-2">Uploaded Images</h4>
              <div className="flex flex-wrap gap-4">
                {(request.files || []).map((img: string, i: number) => (
                  <a
                    key={i}
                    href={img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-24 h-24 border border-neutral-200 rounded-md overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Return image ${i + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {request?.status === ReturnRequestStatus.Pending && (
            <form
              onSubmit={handleSubmit((data) => handleApprove({ data }))}
              className="border-t border-neutral-200 pt-6 mt-4 flex flex-col gap-4"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="accent-primary scale-125"
                  checked={issueFullRefund}
                  onChange={() => setIssueFullRefund((prev) => !prev)}
                />
                <span className="text-sm font-medium">Issue Full Refund</span>
              </label>

              {!issueFullRefund && (
                <InputField
                  labelText="Refund Amount"
                  placeholder="Enter amount to refund"
                  {...register("refundAmount", {
                    required: "Refund amount is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Amount must be greater than 0",
                    },
                    max: {
                      value: orderTotal,
                      message: `Cannot exceed order total (${formatPrice(
                        orderTotal
                      )})`,
                    },
                  })}
                  error={errors.refundAmount?.message}
                />
              )}

              <div className="flex items-center justify-end gap-3 mt-4">
                <ButtonBtn
                  isLoading={isRejecting}
                  disabled={isApproving}
                  type="button"
                  onClick={handleReject}
                  className="!rounded-full bg-red-500 text-neutral-50 hover:bg-red-600"
                >
                  Reject
                </ButtonBtn>

                <ButtonBtn
                  disabled={isRejecting}
                  isLoading={isApproving}
                  type="submit"
                  className="!rounded-full !primaryClasses"
                >
                  Approve
                </ButtonBtn>
              </div>
            </form>
          )}
        </>
      )}
    </BaseModal>
  );
};

export default ReturnRequestModal;
