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
import { CouponTopParamsForm } from "../shared/CouponTopParamsForm";
import { ActiveCouponRow } from "./ActiveCouponRow";
import { ConfirmationModal } from "@/components/modals";

// Providers
import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";

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
import { useExpireCouponMutation } from "@/libs/redux/apiSlices/coupon/couponApiSlice";

const columns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Code", width: "0.3fr" },
  { columnTitle: "Discount Type", width: "0.3fr" },
  { columnTitle: "Discount Value", width: "0.3fr" },
  { columnTitle: "Start Date", width: "0.4fr" },
  { columnTitle: "Expiry Date", width: "0.4fr" },
  { columnTitle: "Usage Limit", width: "0.3fr" },
  { columnTitle: "Used Count", width: "0.3fr" },
];

export const ActiveCouponsMain = () => {
  const tableActionsBlockRef = useRef(null);
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Active Coupons");
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
  } = useCouponQueries({ couponStatus: CouponStatus.Active });

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable(coupons, "_id");

  // Confirmation modal (for expiring coupons)
  const { isModalOpen, openModal, closeModal } = useModal();

  const [expireCoupon, { isLoading: isExpiring }] = useExpireCouponMutation();

  const handleExpireCoupons = catchAsyncGeneral(async () => {
    closeModal();
    const res = await expireCoupon({ ids: selected as string[] }).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      refetch();
    }
  });

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<ICoupon>) => (
    <ActiveCouponRow
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

        {/* Expire selected button */}
        <ButtonBtnTrans
          ref={tableActionsBlockRef}
          onClick={openModal}
          isLoading={isExpiring}
          className="text-red-600 font-inherit ml-auto px-4 !h-[50px] shrink-0"
          disabled={selected.length < 1}
        >
          <WarningIcon />
          Expire Selected
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
          message={`Expire ${selected.length} active coupon(s)?`}
          onConfirm={handleExpireCoupons}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </ProtectedRouteProvider>
  );
};
