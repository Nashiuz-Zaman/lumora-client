"use client";

import { Pagination } from "@shared/Pagination";
import { TabularData, TRenderTableRowProps, TTableColumn } from "@shared/TabularData";
import { ButtonBtnTrans } from "@buttons/ButtonBtnTrans";
import { ArchiveIcon } from "@icons/ArchiveIcon";
import { OrdersTopParamsForm } from "../shared/OrdersTopParamsForm";
import { ConfirmationModal } from "@modals/ConfirmationModal";
import { ProtectedRouteProvider } from "@/providers";
import { ReturnedOrderRow } from "./ReturnedOrderRow";

import { useDynamicHeight } from "@/hooks/useDynamicHeight";
import { useRefState } from "@/hooks/useRefState";
import { useSetElementText } from "@/hooks/useSetElementText";
import { useOrderQueries } from "@/hooks/useOrderQueries";
import { useSelectable } from "@/hooks/useSelectable";
import { useModal } from "@/hooks/useModal";
import { useRef } from "react";
import { UserRoles } from "@/constants/user";
import { OrderSortOptions, OrderStatus } from "@/constants/order";
import { catchAsyncGeneral } from "@/utils/catchAsyncGeneral";
import { showToast } from "@/utils/showToast";
import { IOrder } from "@/types";
import { useArchiveOrdersMutation } from "@apiSlices/order.api.slice";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Order ID", width: "0.25fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Email", width: "0.4fr" },
  { columnTitle: "Shipped At", width: "0.4fr" },
  { columnTitle: "Status", width: "0.3fr" },
  { columnTitle: "Invoice", width: "0.2fr" },
  { columnTitle: "Total", width: "0.3fr" },
];

export const ReturnedOrdersMain = () => {
  const { refs } = useRefState();
  const tableActionsBlockRef = useRef(null);
  useSetElementText(refs?.titleRef?.current, "Returned Orders");
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
  } = useOrderQueries({ orderStatus: OrderStatus.Returned, isPrivate: true });

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
    <ReturnedOrderRow
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
          <div className="!h-[56px] border-t border-neutral-200 mt-auto flex items-center justify-center">
            <Pagination
              totalPages={queryMeta.totalPages}
              currentPage={queryMeta.page}
              setCurrentPage={changePage}
            />
          </div>
        )}

        <ConfirmationModal
          show={isModalOpen}
          message={`Archive ${selected.length} returned order(s)?`}
          onConfirm={handleArchiveOrders}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
