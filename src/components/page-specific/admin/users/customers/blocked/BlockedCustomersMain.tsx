"use client";

// Components
import {
  Pagination,
  TabularData,
  ButtonBtnTrans,
  TRenderTableRowProps,
  TTableColumn,
  SuccessIcon,
} from "@/components/shared";
import { CustomersTopParamsForm } from "../../shared/CustomersTopParamsForm";
import { BlockedCustomerRow } from "./BlockedCustomerRow";
import { ConfirmationModal } from "@/components/modals";

// Providers
import { ProtectedRouteProvider } from "@/providers";

// Hooks
import {
  useModal,
  useSelectable,
  useRefState,
  useSetElementText,
  useDynamicHeight,
  useCustomersQueries,
} from "@/hooks";
import { useRef } from "react";

// Constants
import { UserRoles, OrderSortOptions, UserStatus } from "@/constants";

// Utilities
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { IPaginatedCustomer } from "@/types";
import { useUnblockCustomersMutation } from "@/libs/redux/apiSlices/customer/customerApiSlice";

// Redux / API
const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" }, // checkbox only
  { columnTitle: "Avatar", width: "auto" }, // avatar image
  { columnTitle: "Name", width: "0.35fr" },
  { columnTitle: "Phone", width: "0.3fr" },
  { columnTitle: "Email", width: "0.45fr" },
  { columnTitle: "Joined At", width: "0.35fr" },
  { columnTitle: "Last Login", width: "0.35fr" },
];

export const BlockedCustomersMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Blocked Customers");
  const { admin, superAdmin } = UserRoles;

  const {
    customers,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = useCustomersQueries({ status: UserStatus.blocked });

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable<IPaginatedCustomer, "userId">(customers, "userId");

  // Confirmation Modal
  const {
    isModalOpen: isConfirmModalOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const [unblockCustomers, { isLoading }] = useUnblockCustomersMutation();

  const handleUnblockCustomers = catchAsyncGeneral(async () => {
    const res = await unblockCustomers({
      _ids: (selected as string[]) ?? [],
    }).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      closeConfirmModal();
      refetch();
    }
  });

  const renderRow = ({
    data,
    isLastEl,
  }: TRenderTableRowProps<IPaginatedCustomer>) => (
    <BlockedCustomerRow
      customer={data}
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
        <CustomersTopParamsForm
          params={formParams}
          sortOptions={[...OrderSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
          className="!border-b-0"
        />

        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={() => openConfirmModal()}
          className="text-green-600 font-inherit ml-auto px-4 !h-[50px] shrink-0"
          disabled={selected.length < 1}
        >
          <SuccessIcon />
          Unblock Selected
        </ButtonBtnTrans>

        <TabularData<IPaginatedCustomer>
          style={{ height: `${height}px` }}
          classNameObj={{ headingRow: "bg-white" }}
          columns={columns}
          data={customers}
          noDataText="No customers found"
          renderRow={renderRow}
          dataLoading={isFetching}
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
        />

        {queryMeta?.totalPages > 1 && (
          <div className="h-[56px]! shrink-0! border-t border-neutral-200 mt-auto flex items-center justify-center">
            <Pagination
              totalPages={queryMeta?.totalPages}
              currentPage={queryMeta?.page}
              setCurrentPage={changePage}
            />
          </div>
        )}
      </div>

      {/* Confirmation Modal for Blocking */}
      <ConfirmationModal
        show={isConfirmModalOpen}
        isLoading={isLoading}
        message={`Unblock ${selected.length} customer(s)?`}
        onConfirm={handleUnblockCustomers}
        onCancel={closeConfirmModal}
        isAnimated
      />
    </ProtectedRouteProvider>
  );
};
