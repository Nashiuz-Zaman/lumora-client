"use client";

// Components
import {
  Pagination,
  TabularData,
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { PaymentsTopParamsForm } from "../shared/PaymentsTopParamsForm";

import { IRefundFormValues, RefundModal } from "@/components/modals";

// Providers
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

// Hooks
import {
  useModal,
  useSelectable,
  useRefState,
  useSetElementText,
  useDynamicHeight,
  usePaymentQueries,
} from "@/hooks";

// Constants
import { UserRoles, PaymentSortOptions, PaymentStatus } from "@/constants";

// Utilities
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { IPayment, IRefundPaymentArgs } from "@/types";

// Redux / API
import { useRefundPaymentMutation } from "@/libs/redux/apiSlices/payment/paymentApiSlice";

// React Hook Form
import { UseFormReset } from "react-hook-form";
import { PaidPaymentRow } from "./PaidPaymentRow";

const columns: TTableColumn[] = [
  { columnTitle: "Order ID", width: "0.15fr" },
  { columnTitle: "Customer", width: "0.2fr" },
  { columnTitle: "Email", width: "0.3fr" },
  { columnTitle: "Received at", width: "0.2fr" },
  { columnTitle: "Amount", width: "0.15fr" },
  { columnTitle: "Type", width: "0.2fr" },
  { columnTitle: "Actions", width: "0.4fr" },
];

export const PaidPaymentsMain = () => {
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Paid Payments");
  const { admin, superAdmin } = UserRoles;

  const {
    payments,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = usePaymentQueries({ paymentStatus: PaymentStatus.Paid });

  const { single, removeSingle, setSingle } = useSelectable<IPayment, "_id">(
    payments,
    "_id"
  );

  // Shipping modal
  const { isModalOpen, openModal, closeModal } = useModal();

  const [issueRefund, { isLoading: isRefunding }] = useRefundPaymentMutation();

  const handleRefundPayment = catchAsyncGeneral(async (args) => {
    const data = args?.data as IRefundFormValues;
    const reset = args?.reset as UseFormReset<IRefundFormValues>;
    const dataWithId: IRefundPaymentArgs = { ...data, _id: single! };

    const res = await issueRefund(dataWithId).unwrap();
    if (res?.success) {
      showToast({ message: res.message });
      removeSingle();
      reset();
      closeModal();
      refetch();
    }
  });

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IPayment>) => (
    <PaidPaymentRow
      paymentData={data}
      setSingle={setSingle}
      isLastEl={isLastEl}
      functions={{
        openRefundModal: openModal,
      }}
    />
  );

  const height = useDynamicHeight({
    refElements: [refs.paramsFilterForm, refs.topPanelRef, refs.adminHeader],
    fixedHeights: [queryMeta?.totalPages > 1 ? 56 : 0],
  });

  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <div className="grow flex flex-col">
        <PaymentsTopParamsForm
          params={formParams}
          sortOptions={[...PaymentSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
          className="!border-b-0"
        />

        <TabularData<IPayment>
          style={{ height: `${height}px` }}
          classNameObj={{ headingRow: "bg-white" }}
          columns={columns}
          data={payments}
          noDataText="No orders found"
          renderRow={renderRow}
          dataLoading={isFetching}
        />

        {queryMeta?.totalPages > 1 && (
          <div className="!h-[56px] !shrink-0 border-t border-neutral-200 mt-auto flex items-center justify-center">
            <Pagination
              totalPages={queryMeta?.totalPages}
              currentPage={queryMeta?.page}
              setCurrentPage={changePage}
            />
          </div>
        )}
      </div>

      {/* Shipping Modal */}
      <RefundModal
        isRefunding={isRefunding}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleRefundPayment}
      />
    </ProtectedRouteProvider>
  );
};
