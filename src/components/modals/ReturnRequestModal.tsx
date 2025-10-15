"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

// Components
import { BaseModal } from "@/components/modals";
import {
  ButtonBtn,
  Inputfield,
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
import { useGetReturnRequestQuery } from "@/libs/redux/apiSlices/returnRequest/returnRequestApiSlice";

// Utils
import { formatPrice } from "@/utils";
import { ReturnRequestStatus } from "@/constants";
import type { TRootState } from "@/libs/redux/store";

export const ReturnRequestModal = () => {
  const dispatch = useDispatch();
  const { requestId, isRequestModalOpen } = useSelector(
    (state: TRootState) => state.returnRequest
  );

  const [refundAmount, setRefundAmount] = useState("");
  const [issueFullRefund, setIssueFullRefund] = useState(true);

  const { data, isFetching, isError } = useGetReturnRequestQuery(
    { id: requestId as string, populate: "order" },
    { skip: !isRequestModalOpen || !requestId }
  );

  const request = data?.success ? data.data?.returnRequest : undefined;

  // Set full refund amount automatically
  useEffect(() => {
    if (isRequestModalOpen && request?.order?.total && issueFullRefund) {
      setRefundAmount(String(request?.order?.total));
    }
  }, [isRequestModalOpen, request, issueFullRefund]);

  const closeFunction = () => {
    dispatch(setIsRequestModalOpen(false));
    dispatch(setRequestId(null));
    dispatch(setBackdropOpen(false));
  };

  const handleApprove = () => {
    if (!request) return;

    const amount = issueFullRefund
      ? request?.order?.total
      : Number(refundAmount);

    // handle approve logic (dispatch action / mutation)
    console.log("Approved refund for:", amount);
  };

  return (
    <BaseModal
      className="max-h-[50rem] min-h-[30rem] max-w-[60rem] !w-full bg-white p-10 rounded-xl flex flex-col gap-6"
      condition={isRequestModalOpen}
      closeFunction={closeFunction}
    >
      {isFetching && <LoadingSpinner centered={true} />}

      {!isFetching && (isError || !request) && (
        <ErrorMessage
          centered={true}
          text="Failed to load return request details."
        />
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
              <p className="text-neutral-700">
                {formatPrice(request?.order?.total as number)}
              </p>
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
            <div className="border-t border-neutral-200 pt-6 mt-4 flex flex-col gap-4">
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
                <Inputfield
                  labelText="Refund Amount"
                  type="number"
                  name="refundAmount"
                  placeholder="Enter amount to refund"
                  value={refundAmount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRefundAmount(e.target.value)
                  }
                  min={0}
                  max={request?.order?.total as number}
                  required={true}
                />
              )}

              <ButtonBtn
                onClick={handleApprove}
                className="!rounded-full !primaryClasses ml-auto mt-4"
              >
                Approve Request
              </ButtonBtn>
            </div>
          )}
        </>
      )}
    </BaseModal>
  );
};

export default ReturnRequestModal;
