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
import { CouponTopParamsForm } from "../shared/CouponTopParamsForm";
import { ExpiredCouponRow } from "./ExpiredCouponRow";
import { ConfirmationModal } from "@/components/modals";

// Providers
import {ProtectedRouteProvider} from "@/providers";

// Hooks
import {
  useModal,
  useSelectable,
  useRefState,
  useSetElementText,
  useDynamicHeight,
  useCouponQueries,
} from "@/hooks";
import { useRef } from "react";

// Constants
import { UserRoles, CouponStatus, CouponSortOptions } from "@/constants";

// Utilities
import { catchAsyncGeneral, showToast } from "@/utils";

// Types
import { ICoupon } from "@/types";

// Redux / API
import { useDeleteCouponsMutation } from "@/libs/redux/apiSlices/coupon/couponApiSlice";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Code", width: "0.3fr" },
  { columnTitle: "Discount Type", width: "0.3fr" },
  { columnTitle: "Discount Value", width: "0.3fr" },
  { columnTitle: "Expiry Date", width: "0.4fr" },
  { columnTitle: "Expired At", width: "0.4fr" },
  { columnTitle: "Usage Limit", width: "0.3fr" },
  { columnTitle: "Used Count", width: "0.3fr" },
];

export const ExpiredCouponsMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Expired Coupons");
  const { admin, superAdmin } = UserRoles;

  const {
    coupons,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = useCouponQueries({ couponStatus: CouponStatus.Expired });

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable(coupons, "_id");

  // Confirmation modal (for deleting coupons)
  const { isModalOpen, openModal, closeModal } = useModal();

  const [deleteCoupons, { isLoading: isDeleting }] = useDeleteCouponsMutation();

  const handleDeleteCoupons = catchAsyncGeneral(async () => {
    closeModal();
    const res = await deleteCoupons({ ids: selected as string[] }).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      refetch();
    }
  });

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<ICoupon>) => (
    <ExpiredCouponRow
      couponData={data}
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
        <CouponTopParamsForm
          params={formParams}
          sortOptions={[...CouponSortOptions]}
          setParams={setFormParams}
          onSubmit={handleSubmit}
          className="!border-b-0"
        />

        {/* Delete selected button */}
        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={openModal}
          isLoading={isDeleting}
          className="text-red-600 font-inherit ml-auto px-4 !h-[50px] shrink-0"
          disabled={selected.length < 1}
        >
          <TrashcanIcon />
          Delete Selected
        </ButtonBtnTrans>

        {/* Table */}
        <TabularData<ICoupon>
          style={{ height: `${height}px` }}
          classNameObj={{ headingRow: "bg-white" }}
          columns={columns}
          data={coupons}
          noDataText="No coupons found"
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
          message={`Delete ${selected.length} coupon(s)?`}
          onConfirm={handleDeleteCoupons}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
