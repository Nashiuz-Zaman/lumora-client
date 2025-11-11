"use client";

// Components
import {
  Pagination,
  TabularData,
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { PaymentsTopParamsForm } from "../shared/PaymentsTopParamsForm";
import { PaymentRow } from "./PaymentRow";

// Providers
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

// Hooks
import {
  useRefState,
  useSetElementText,
  useDynamicHeight,
  usePaymentQueries,
} from "@/hooks";

// Constants
import { UserRoles, PaymentSortOptions, PaymentType } from "@/constants";

// Types
import { IPayment } from "@/types";

const columns: TTableColumn[] = [
  { columnTitle: "Order ID", width: "0.15fr" },
  { columnTitle: "Customer", width: "0.2fr" },
  { columnTitle: "Email", width: "0.3fr" },
  { columnTitle: "Received at", width: "0.2fr" },
  { columnTitle: "Amount", width: "0.15fr" },
  { columnTitle: "Type", width: "0.2fr" },
];

export const PaymentsMain = () => {
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Payments");
  const { admin, superAdmin } = UserRoles;

  const {
    payments,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
  } = usePaymentQueries({ transactionType: PaymentType.payment });

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IPayment>) => (
    <PaymentRow paymentData={data} isLastEl={isLastEl} />
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
          noDataText="No payments found"
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
    </ProtectedRouteProvider>
  );
};
