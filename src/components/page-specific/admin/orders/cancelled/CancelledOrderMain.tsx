"use client";

"use client";

// Components
import {
  Pagination,
  TabularData,
  ButtonBtnTrans,
  TRenderTableRowProps,
  TTableColumn,
  ArchiveIcon,
} from "@/components/shared";
import { OrdersTopParamsForm } from "../shared/OrdersTopParamsForm";
import { CancelledOrderRow } from "./CancelledOrderRow";
import { ConfirmationModal } from "@/components/modals";

// Providers
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

// Hooks
import {
  useOrderQueries,
  useSelectable,
  useRefState,
  useSetElementText,
  useModal,
  useDynamicHeight,
} from "@/hooks";
import { useRef } from "react";

// Constants
import { UserRoles, OrderSortOptions, OrderStatus } from "@/constants";

// Utilities
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { IOrder } from "@/types";

// Redux / API
import { useArchiveOrdersMutation } from "@/libs/redux/apiSlices/orders/orderApiSlice";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Order ID", width: "0.2fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Email", width: "0.4fr" },
  { columnTitle: "Total", width: "0.25fr" },
  { columnTitle: "Invoice", width: "0.2fr" },
  { columnTitle: "Cancelled At", width: "0.3fr" },
  { columnTitle: "Reason", width: "0.4fr" },
];

export const CancelledOrdersMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Cancelled Orders");
  const { admin, superAdmin } = UserRoles;
  const { closeModal, openModal, isModalOpen } = useModal();

  const {
    orders,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = useOrderQueries({
    orderStatus: OrderStatus.Cancelled,
    isPrivate: true,
    extraLimitFields: ["cancellationReason"],
  });

  const [archiveOrders, { isLoading: isArchiving }] =
    useArchiveOrdersMutation();

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable(orders, "_id");

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IOrder>) => (
    <CancelledOrderRow
      orderData={data}
      isSelected={checkIfSelected(data)}
      functions={{ toggleSelectOne }}
      isLastEl={isLastEl}
    />
  );

  const height = useDynamicHeight({
    refElements: [
      refs.paramsFilterForm,
      refs.topPanelRef,
      refs.adminHeader,
      tableActionsBlockRef,
    ],
    fixedHeights: [queryMeta?.totalPages > 1 ? 56 : 0],
  });

  // confirm action for modal
  const handleArchiveOrders = catchAsyncGeneral(async () => {
    closeModal();
    const res = await archiveOrders({ _ids: selected as string[] }).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      refetch();
    }
  });

  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <div className="grow flex flex-col">
        <OrdersTopParamsForm
          params={formParams}
          sortOptions={[...OrderSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
          className="!border-b-0"
        />

        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={openModal}
          isLoading={isArchiving}
          className="text-red-500 font-inherit ml-auto px-4 !h-[50px] shrink-0"
          disabled={selected.length < 1}
        >
          <ArchiveIcon className="text-2xl" />
          Archive Selected
        </ButtonBtnTrans>

        <TabularData<IOrder>
          style={{ height: `${height}px` }}
          classNameObj={{ headingRow: "bg-white" }}
          columns={columns}
          data={orders}
          noDataText="No orders found"
          renderRow={renderRow}
          dataLoading={isFetching}
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
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

        {/* Confirmation modal */}
        <ConfirmationModal
          show={isModalOpen}
          message={`Mark ${selected.length} order(s) as delivered?`}
          onConfirm={handleArchiveOrders}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
