"use client";

// Components
import { Pagination } from "@/components/shared/Pagination";
import { TabularData, TRenderTableRowProps, TTableColumn } from "@/components/shared/TabularData";
import { ButtonBtnTrans } from "@buttons/ButtonBtnTrans";
import { TrashcanIcon } from "@icons/TrashcanIcon";

import { ConfirmationModal } from "@modals/ConfirmationModal";
import { ReturnsTopParamsForm } from "../shared/ReturnsTopParamsForm";

// Providers
import { ProtectedRouteProvider } from "@/providers";

// Hooks
import { useModal } from "@/hooks/useModal";
import { useSelectable } from "@/hooks/useSelectable";
import { useRefState } from "@/hooks/useRefState";
import { useSetElementText } from "@/hooks/useSetElementText";
import { useDynamicHeight } from "@/hooks/useDynamicHeight";
import { useReturnRequestQueries } from "@/hooks/useReturnRequestQueries";
import { MouseEvent, useRef } from "react";

// Constants
import { UserRoles } from "@/constants/user";
import { ReturnRequestSortOptions, ReturnRequestStatus } from "@/constants/returnRequest";

// Utilities
import { catchAsyncGeneral } from "@/utils/catchAsyncGeneral";
import { showToast } from "@/utils/showToast";

// Types
import { IReturnRequest } from "@/types";

// Redux / API
import { useDeleteReturnRequestsMutation } from "@apiSlices/returnRequest.api.slice";
import { ProcessedRequestRow } from "../shared/ProcessedRequestRow";
import { useDispatch } from "react-redux";
import {
  setIsRequestModalOpen,
  setRequestId,
} from "@features/returnRequest/returnRequest";
import { setBackdropOpen } from "@features/backdrop/backdropSlice";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Order ID", width: "0.2fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Email", width: "0.4fr" },
  { columnTitle: "Phone", width: "0.2fr" },
  { columnTitle: "Approved At", width: "0.35fr" },
  { columnTitle: "Reason", width: "0.4fr" },
  { columnTitle: "Invoice", width: "0.2fr" },
  { columnTitle: "Total", width: "0.2fr" },
];

export const ApprovedRequestsMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Approved Return Requests");
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
    refetch,
  } = useReturnRequestQueries({ requestStatus: ReturnRequestStatus.Approved });

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable(returnRequests, "_id");

  // Confirmation modal (for deleting requests)
  const { isModalOpen, openModal, closeModal } = useModal();

  const [deleteRequests, { isLoading: isDeleting }] =
    useDeleteReturnRequestsMutation();

  const handleDeleteRequests = catchAsyncGeneral(async () => {
    closeModal();
    const res = await deleteRequests({ ids: selected as string[] }).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      refetch();
    }
  });

  const renderRow = ({
    data,
    isLastEl,
  }: TRenderTableRowProps<IReturnRequest>) => (
    <ProcessedRequestRow
      requestData={data}
      isSelected={checkIfSelected(data)}
      toggleSelectOne={toggleSelectOne}
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

  const handleRowClick = (_: MouseEvent<HTMLTableRowElement>, id: string) => {
    dispatch(setRequestId(id));
    dispatch(setBackdropOpen(true));
    dispatch(setIsRequestModalOpen(true));
  };

  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <div className="grow flex flex-col">
        {/* Filter and sorting form */}
        <ReturnsTopParamsForm
          params={formParams}
          sortOptions={[...ReturnRequestSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
          className="border-b-0!"
        />

        {/* Delete selected button */}
        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={openModal}
          isLoading={isDeleting}
          className="text-red-600 font-inherit ml-auto px-4 h-[50px]! shrink-0"
          disabled={selected.length < 1}
        >
          <TrashcanIcon />
          Delete Selected
        </ButtonBtnTrans>

        {/* Table */}
        <TabularData<IReturnRequest>
          style={{ height: `${height}px` }}
          classNameObj={{ headingRow: "bg-white" }}
          columns={columns}
          data={returnRequests}
          noDataText="No requests found"
          renderRow={renderRow}
          dataLoading={isFetching}
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
          onRowClick={handleRowClick}
        />

        {/* Pagination */}
        {queryMeta?.totalPages > 1 && (
          <div className="h-14! border-t border-neutral-200 mt-auto flex items-center justify-center">
            <Pagination
              totalPages={queryMeta.totalPages}
              currentPage={queryMeta.page}
              setCurrentPage={changePage}
            />
          </div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          show={isModalOpen}
          message={`Delete ${selected.length} approved request(s)?`}
          onConfirm={handleDeleteRequests}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
