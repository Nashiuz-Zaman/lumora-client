// THIS IS A PAGE
import { CollectionCard } from "@page-specific/admin/products/CollectionCard";
import { DashboardPageHeading } from "@/components/shared/DashboardPageHeading";
import { InnerContainer } from "@containers/InnerContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central Users Management | Admin Panel",
};

const AdminCentralUserManagementPage = async () => {
  return (
    <InnerContainer className="grow">
      <div className="py-10">
        <DashboardPageHeading className="mb-6" text={"Users"} />

        {/* Customers */}
        <section>
          <h2 className="text-xl font-semibold mb-4 capitalize">Customers</h2>

          <div className="grid gap-4 xl:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CollectionCard
              href="/admin/users/customers/active"
              noDeleteBtn={true}
              title="Active"
            />

            <CollectionCard
              href="/admin/users/customers/blocked"
              noDeleteBtn={true}
              title="Blocked"
            />
          </div>
        </section>
      </div>
    </InnerContainer>
  );
};

export default AdminCentralUserManagementPage;
