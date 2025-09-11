// THIS IS A PAGE
import { CollectionCard } from "@/components/page-specific";
import { DashboardPageHeading, InnerContainer } from "@/components/shared";
import { Metadata } from "next";

import { IProductCollectionsByPage } from "@/types";
import { fetchAllProductCollections } from "@/server-functions/fetchAllProductCollections";

export const metadata: Metadata = {
  title: "Central Products Management | Admin Panel",
};

const AdminCentralProductManagementPage = async () => {
  let collectionsByPageGroup: IProductCollectionsByPage[] = [];

  const res = await fetchAllProductCollections();

  if ("isError" in res || !res) {
    collectionsByPageGroup = [];
  } else {
    collectionsByPageGroup = res.data?.collections || [];
  }

  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <DashboardPageHeading className="mb-6" text={"Products"} />

        {/* Static card for all products */}
        <CollectionCard
          href="/admin/products/all-products"
          className="!w-[24.25%]"
          noDeleteBtn={true}
          title="All Products"
        />

        {/* Render fetched collections grouped by page */}
        <div className="space-y-10 mt-10">
          {collectionsByPageGroup.map((group) => (
            <div key={group._id}>
              {/* Page heading */}
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {group._id}
              </h2>

              {/* Collection cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.productCollections.map((collection) => (
                  <CollectionCard
                    
                    key={collection.slug}
                    href={`/admin/products/collection/${collection.slug}`}
                    title={collection.title}
                    noDeleteBtn={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </InnerContainer>
  );
};

export default AdminCentralProductManagementPage;
