"use client";

import {
  InnerContainer,
  LoadingSpinner,
  NoData,
  Pagination,
} from "@/components/shared";
import { OrderCard } from "./OrderCard";
import { PageSection } from "./PageSection";

import {
  IOrderQueriesParams,
  TStatusValue,
  useModal,
  useOrderQueries,
  useSelectable,
} from "@/hooks";
import { CustomerDashboardFilterForm } from "../shared/CustomerDashboardFilterForm";
import { ICancelOrdersCustomerArgs, IOrder, TSortOptions } from "@/types";
import { OrderStatus } from "@/constants";
import { ConfirmationModal } from "@/components/modals";
import { useCancelOrdersCustomerMutation } from "@/libs/redux/apiSlices/orders/orderApiSlice";
import { catchAsyncGeneral, showToast } from "@/utils";

const STATUSES = [
  { label: "All", value: "all" },
  ...Object.entries(OrderStatus)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .filter(({ label }) => label !== "Pending"),
];

const SORT_OPTIONS = Object.freeze([
  { label: "Placed On", value: "createdAt" },
  { label: "Updated", value: "updatedAt" },
  { label: "Order Total", value: "total" },
] as const satisfies TSortOptions<IOrder>);

export const CustomerOrdersMain = () => {
  // Confirmation modal
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    orders,
    queryMeta,
    isFetching,
    formParams,
    setFormParams,
    handleSubmit,
    changePage,
    refetch,
  } = useOrderQueries({
    isPrivate: false,
    limit: 5,
  });

  const [cancelOrders, { isLoading: isCancelling }] =
    useCancelOrdersCustomerMutation();

  const { removeSingle, setSingle, single } = useSelectable(orders, "_id");

  const handleCustomerCancel = catchAsyncGeneral(async () => {
    const data: ICancelOrdersCustomerArgs = {
      _ids: [single as string],
    };

    const res = await cancelOrders(data).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      if (single) removeSingle();
      closeModal();
      refetch();
    }
  });

  return (
    <InnerContainer className="py-10 grow">
      <div className="w-full h-full flex flex-col">
        <CustomerDashboardFilterForm
          searchTitle="Search Orders"
          statusTitle="Order Status"
          formParams={
            {
              ...formParams,
              status:
                formParams.status === "all"
                  ? formParams.status
                  : Number(formParams.status) > 0
                  ? (Number(formParams.status) as TStatusValue)
                  : (1 as TStatusValue),
            } as IOrderQueriesParams
          }
          setFormParams={setFormParams}
          onSubmit={handleSubmit}
          sortOptions={[...SORT_OPTIONS]}
          statusOptions={STATUSES}
          placeholder="Search Orders by Order ID"
          roleLabel="Order"
        />

        {/* Orders List */}
        <PageSection title="Your Orders" className="relative grow">
          {isFetching ? (
            <LoadingSpinner centered={true} />
          ) : (
            <div className="grid gap-4">
              {orders?.length === 0 ? (
                <NoData text="You have no orders" centered />
              ) : (
                orders?.map((order, idx) => (
                  <OrderCard
                    onClick={(_id) => {
                      setSingle(_id);
                      openModal();
                    }}
                    key={idx}
                    order={order}
                  />
                ))
              )}
            </div>
          )}
        </PageSection>

        {queryMeta?.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              totalPages={queryMeta?.totalPages}
              currentPage={queryMeta?.page}
              setCurrentPage={changePage}
            />
          </div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isLoading={isCancelling}
          show={isModalOpen}
          message={"Do you want to cancel this order?"}
          onConfirm={handleCustomerCancel}
          onCancel={closeModal}
          isAnimated
        />
      </div>
    </InnerContainer>
  );
};
