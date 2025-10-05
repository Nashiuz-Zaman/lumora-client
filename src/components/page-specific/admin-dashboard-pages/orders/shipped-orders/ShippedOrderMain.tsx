"use client";

import {
  Pagination,
  TabularData,
  ButtonBtnTrans,
  TRenderTableRowProps,
  TTableColumn,
  DeliverIcon,
} from "@/components/shared";
import { OrdersTopParamsForm } from "../shared/OrdersTopParamsForm";
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";
import { ShippedOrderRow } from "./ShippedOrderRow";
import { ConfirmationModal } from "@/components/modals";

import {
  useOrdersQueries,
  useSelectable,
  useRefState,
  useSetElementText,
  useModal,
} from "@/hooks";
import { UserRoles, OrderSortOptions, OrderStatus } from "@/constants";

// Types
import { IOrder } from "@/types";

import { useRef } from "react";
import { useDynamicHeight } from "@/hooks/useDynamicHeight";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Order ID", width: "0.25fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Email", width: "0.4fr" },
  { columnTitle: "Shipped At", width: "0.4fr" },
  { columnTitle: "Estimated Delivery", width: "0.4fr" },
  { columnTitle: "Total", width: "0.3fr" },
];

export const ShippedOrdersMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Shipped Orders");
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
  } = useOrdersQueries({ orderStatus: OrderStatus.Shipped, isPrivate: true });

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable(orders, "orderId");

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IOrder>) => (
    <ShippedOrderRow
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
  const handleConfirmDeliver = () => {
    console.log("Marking selected orders as delivered:", selected);
    // TODO: call API or redux action here
    closeModal();
  };

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
          onClick={openModal}
          className="text-primary font-inherit ml-auto px-4 !h-[50px] shrink-0"
          isDisabled={selected.length < 1}
        >
          <DeliverIcon className="text-2xl" />
          Mark as delivered
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
          onConfirm={handleConfirmDeliver}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
