"use client";

import { InnerContainer, NoData } from "@/components/shared";
import { OrderCard } from "./OrderCard";
import { PageSection } from "./PageSection";
import { SearchBox } from "./SearchBox";
import { StatusTabs } from "./StatusTabs";
import { useAuthState, useOrderQueries } from "@/hooks";

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

  console.log(orders, queryMeta);

  return (
    <InnerContainer className="h-full">
      <div className="w-full h-full px-4 py-6 flex flex-col">
        {/* Search */}
        <PageSection title="Search Orders">
          {/* TODO: add search functionality later */}
          <SearchBox />
        </PageSection>

        {/* Status Tabs */}
        <PageSection title="Order Status">
          {/* TODO: add tab API logic later */}
          <StatusTabs statuses={STATUSES} />
        </PageSection>

        {/* Orders List */}
        {/* Orders List */}
        <PageSection title="Your Orders" className="relative grow">
          <div className="grid gap-4">
            {orders?.length === 0 ? (
              <NoData text="You have no orders" centered />
            ) : (
              orders?.map((order, idx) => <OrderCard key={idx} order={order} />)
            )}
          </div>
        </PageSection>
      </div>
    </InnerContainer>
  );
};
