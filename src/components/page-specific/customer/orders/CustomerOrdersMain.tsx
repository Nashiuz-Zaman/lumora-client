"use client";

import {
  InnerContainer,
  LoadingSpinner,
  NoData,
  Pagination,
} from "@/components/shared";
import { OrderCard } from "./OrderCard";
import { PageSection } from "./PageSection";

import { useAuthState, useOrderQueries } from "@/hooks";
import { CustomerDashboardFilterForm } from "../shared/CustomerDashboardFilterForm";
import { IOrder, TSortOptions } from "@/types";

const STATUSES = [
  "All",
  "Active",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

export const CustomerOrdersMain = () => {
  const { user } = useAuthState();
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
    user: user?._id,
  });

  const SORT_OPTIONS = Object.freeze([
    { label: "Placed On", value: "createdAt" },
    { label: "Updated", value: "updatedAt" },
    { label: "Order Total", value: "total" },
  ] as const satisfies TSortOptions<IOrder>);

  return (
    <InnerContainer className="h-full">
      <div className="w-full h-full px-4 py-6 flex flex-col">
        <CustomerDashboardFilterForm
          searchTitle="Search Orders"
          statusTitle="Order Status"
          formParams={formParams}
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
            <LoadingSpinner centered />
          ) : (
            <div className="grid gap-4">
              {orders?.length === 0 ? (
                <NoData text="You have no orders" centered />
              ) : (
                orders?.map((order, idx) => (
                  <OrderCard key={idx} order={order} />
                ))
              )}
            </div>
          )}
        </PageSection>

        {queryMeta?.totalPages && (
          <div className="mt-8">
            <Pagination
              totalPages={queryMeta?.totalPages}
              currentPage={queryMeta?.page}
              setCurrentPage={changePage}
            />
          </div>
        )}
      </div>
    </InnerContainer>
  );
};
