"use client";

import {
  Pagination,
  TabularData,
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { OrdersTopParamsForm } from "../shared/OrdersTopParamsForm";
import {ProtectedRouteProvider} from "@/providers";
import { DeliveredOrderRow } from "./ArchivedOrderRow";

import { useDynamicHeight } from "@/hooks/useDynamicHeight";
import { useRefState, useSetElementText } from "@/hooks";
import { UserRoles, OrderSortOptions } from "@/constants";
import { useOrderQueries } from "@/hooks";
import { IOrder } from "@/types";

const columns: TTableColumn[] = [
  { columnTitle: "Order ID", width: "0.25fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Email", width: "0.4fr" },
  { columnTitle: "Archived At", width: "0.35fr" },
  { columnTitle: "Status", width: "0.25fr" },
  { columnTitle: "Invoice", width: "0.2fr" },
  { columnTitle: "Total", width: "0.3fr" },
];

export const ArchivedOrdersMain = () => {
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Archived Orders");
  const { admin, superAdmin } = UserRoles;

  const {
    orders,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
  } = useOrderQueries({ isArchived: true, isPrivate: true });

  const height = useDynamicHeight({
    refElements: [refs.paramsFilterForm, refs.topPanelRef, refs.adminHeader],
    fixedHeights: [queryMeta?.totalPages > 1 ? 56 : 0],
  });

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IOrder>) => (
    <DeliveredOrderRow orderData={data} isLastEl={isLastEl} />
  );

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

        <TabularData<IOrder>
          style={{ height: `${height}px` }}
          classNameObj={{ headingRow: "bg-white" }}
          columns={columns}
          data={orders}
          noDataText="No orders found"
          renderRow={renderRow}
          dataLoading={isFetching}
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
      </div>
    </ProtectedRouteProvider>
  );
};
