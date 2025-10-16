"use client";

// Components
import {
  Pagination,
  TabularData,
  ButtonBtnTrans,
  TRenderTableRowProps,
  TTableColumn,
  TrashcanIcon,
} from "@/components/shared";
import { ConfirmationModal } from "@/components/modals";
import { ReturnsTopParamsForm } from "../shared/ReturnsTopParamsForm";

// Providers
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

// Hooks
import {
  useModal,
  useSelectable,
  useRefState,
  useSetElementText,
  useDynamicHeight,
  useReturnRequestQueries,
} from "@/hooks";
import { useRef } from "react";

// Constants
import {
  UserRoles,
  ReturnRequestSortOptions,
  ReturnRequestStatus,
} from "@/constants";

// Utilities
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { IReturnRequest } from "@/types";

// Redux / API
import { useDeleteReturnRequestsMutation } from "@/libs/redux/apiSlices/returnRequest/returnRequestApiSlice";
import { ProcessedRequestRow } from "../shared/ProcessedRequestRow";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Order ID", width: "0.2fr" },
  { columnTitle: "Customer", width: "0.3fr" },
  { columnTitle: "Email", width: "0.45fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Rejected At", width: "0.35fr" },
  { columnTitle: "Reason", width: "0.4fr" },
  { columnTitle: "Invoice", width: "0.2fr" },
  { columnTitle: "Total", width: "0.2fr" },
];

export const RejectedRequestsMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Rejected Return Requests");
  const { admin, superAdmin } = UserRoles;

  const {
    returnRequests,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = useReturnRequestQueries({ requestStatus: ReturnRequestStatus.Rejected });

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

  return (
    <ProtectedRouteProvider allowedRoles={[admin, superAdmin]}>
      <div className="grow flex flex-col">
        {/* Filter and sorting form */}
        <ReturnsTopParamsForm
          params={formParams}
          sortOptions={[...ReturnRequestSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
        />

        {/* Delete selected button */}
        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={openModal}
          isLoading={isDeleting}
          className="text-red-600 font-inherit ml-auto px-4 !h-[50px] shrink-0"
          isDisabled={selected.length < 1}
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
        />

        {/* Pagination */}
        {queryMeta?.totalPages > 1 && (
          <div className="!h-[56px] border-t border-neutral-200 mt-auto flex items-center justify-center">
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
          message={`Delete ${selected.length} rejected request(s)?`}
          onConfirm={handleDeleteRequests}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
