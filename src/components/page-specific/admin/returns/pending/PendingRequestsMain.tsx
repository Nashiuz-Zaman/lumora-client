"use client";

// Components
import {
  Pagination,
  TabularData,
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { ReturnsTopParamsForm } from "../shared/ReturnsTopParamsForm";
import { PendingRequestRow } from "./PendingRequestRow";

// Providers
import {ProtectedRouteProvider} from "@/providers";

// Hooks
import { useRefState, useSetElementText, useDynamicHeight } from "@/hooks";
import { useReturnRequestQueries } from "@/hooks/useReturnRequestQueries";

// Constants
import {
  UserRoles,
  ReturnRequestStatus,
  ReturnRequestSortOptions,
} from "@/constants";

// Types
import { IReturnRequest } from "@/types";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import {
  setIsRequestModalOpen,
  setRequestId,
} from "@/libs/redux/features/returnRequest/returnRequest";
import { setBackdropOpen } from "@/libs/redux/features/backdrop/backdropSlice";

const columns: TTableColumn[] = [
  { columnTitle: "Order ID", width: "0.2fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Email", width: "0.45fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Created At", width: "0.35fr" },
  { columnTitle: "Reason", width: "0.4fr" },
  { columnTitle: "Invoice", width: "0.2fr" },
  { columnTitle: "Total", width: "0.2fr" },
];

export const PendingRequestsMain = () => {
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Pending Return Requests");
  const { admin, superAdmin } = UserRoles;
  const dispatch = useDispatch();

  const {
    returnRequests,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
  } = useReturnRequestQueries({ requestStatus: ReturnRequestStatus.Pending });

  const renderRow = ({
    data,
    isLastEl,
  }: TRenderTableRowProps<IReturnRequest>) => (
    <PendingRequestRow requestData={data} isLastEl={isLastEl} />
  );

  const height = useDynamicHeight({
    refElements: [refs.paramsFilterForm, refs.topPanelRef, refs.adminHeader],
    fixedHeights: [queryMeta?.totalPages > 1 ? 56 : 0],
  });

  const handleRowClick = (_: MouseEvent<HTMLTableRowElement>, id: string) => {
    dispatch(setRequestId(id));
    dispatch(setBackdropOpen(true));
    dispatch(setIsRequestModalOpen(true));
  };

  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <div className="grow flex flex-col">
        <ReturnsTopParamsForm
          params={formParams}
          sortOptions={[...ReturnRequestSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
          className="!border-b-0"
        />

        <TabularData<IReturnRequest>
          style={{ height: `${height}px` }}
          columns={columns}
          data={returnRequests}
          noDataText="No requests found"
          renderRow={renderRow}
          dataLoading={isFetching}
          onRowClick={handleRowClick}
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
