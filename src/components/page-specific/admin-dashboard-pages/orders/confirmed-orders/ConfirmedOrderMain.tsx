"use client";

// Components
import {
  Pagination,
  TabularData,
  WarningIcon,
  ButtonBtnTrans,
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { OrdersTopParamsForm } from "../shared/OrdersTopParamsForm";
import { ConfirmedOrderRow } from "./ConfirmedOrderRow";
import {
  CancelOrderModalAdmin,
  IShippingFormValues,
  ShippingModal,
} from "@/components/modals";

// Providers
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

// Hooks
import {
  useOrdersQueries,
  useModal,
  useSelectable,
  useRefState,
  useSetElementText,
  useDynamicHeight,
} from "@/hooks";
import { useRef } from "react";

// Constants
import { UserRoles, OrderSortOptions, OrderStatus } from "@/constants";

// Utilities
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { ICancelOrdersAdminArgs, IMarkOrderShippedArgs, IOrder } from "@/types";

// Redux / API
import {
  useCancelOrdersMutation,
  useMarkOrderShippedMutation,
} from "@/libs/redux/apiSlices/orders/orderApiSlice";

// React Hook Form
import { UseFormReset } from "react-hook-form";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Order ID", width: "0.3fr" },
  { columnTitle: "Customer", width: "0.4fr" },
  { columnTitle: "Phone", width: "0.4fr" },
  { columnTitle: "Email", width: "0.5fr" },
  { columnTitle: "Confirmed at", width: "0.5fr" },
  { columnTitle: "Total", width: "0.2fr" },
  { columnTitle: "Actions", width: "0.4fr" },
];

const ConfirmedOrdersMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Confirmed Orders");
  const { admin, superAdmin } = UserRoles;

  const {
    orders,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = useOrdersQueries({ orderStatus: OrderStatus.Confirmed, isPrivate: true });

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
    single,
    removeSingle,
    setSingle,
  } = useSelectable<IOrder, "_id">(orders, "_id");

  // Shipping modal
  const {
    isModalOpen: isShippingModalOpen,
    openModal: openShippingModal,
    closeModal: closeShippingModal,
  } = useModal();

  const [markOrderShipped, { isLoading: isMarkingOrderShipped }] =
    useMarkOrderShippedMutation();

  const handleMarkShipped = catchAsyncGeneral(async (args) => {
    const data = args?.data as IShippingFormValues;
    const reset = args?.reset as UseFormReset<IShippingFormValues>;
    const dataWithId: IMarkOrderShippedArgs = { ...data, _id: single! };

    const res = await markOrderShipped(dataWithId).unwrap();
    if (res?.success) {
      showToast({ message: res.message });
      removeSingle();
      reset();
      closeShippingModal();
      refetch();
    }
  });

  // Cancel modal
  const {
    isModalOpen: isCancelModalOpen,
    openModal: openCancelModal,
    closeModal: closeCancelModal,
  } = useModal();

  const [cancelOrders, { isLoading: isCancelling }] = useCancelOrdersMutation();

  const handleAdminCancel = catchAsyncGeneral(async (args) => {
    const e = args?.e as React.FormEvent<HTMLFormElement>;
    const form = e.currentTarget;

    const data: ICancelOrdersAdminArgs = {
      _ids: single ? ([single] as string[]) : (selected as string[]),
      reason: form.reason.value,
    };

    const res = await cancelOrders(data).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      if (single) removeSingle();
      closeCancelModal();
      form.reset();
      refetch();
    }
  });

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IOrder>) => (
    <ConfirmedOrderRow
      orderData={data}
      isSelected={checkIfSelected(data)}
      toggleSelectOne={toggleSelectOne}
      setSingle={setSingle}
      isLastEl={isLastEl}
      functions={{
        openShippingModal,
        openCancelModal,
      }}
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

  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <div className="grow flex flex-col">
        <OrdersTopParamsForm
          params={formParams}
          sortOptions={[...OrderSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
        />

        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={() => openCancelModal()}
          className="text-red-600 font-inherit ml-auto px-4 !h-[50px] shrink-0"
          isDisabled={selected.length < 1}
        >
          <WarningIcon />
          Cancel Selected
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
      </div>

      {/* Shipping Modal */}
      <ShippingModal
        isLoading={isMarkingOrderShipped}
        isOpen={isShippingModalOpen}
        onClose={closeShippingModal}
        onSubmit={handleMarkShipped}
      />

      {/* Cancel Order Modal */}
      <CancelOrderModalAdmin
        isOpen={isCancelModalOpen}
        onClose={closeCancelModal}
        onSubmit={handleAdminCancel}
        isLoading={isCancelling}
        defaultValues={{ reason: "" }}
      />
    </ProtectedRouteProvider>
  );
};

export default ConfirmedOrdersMain;
