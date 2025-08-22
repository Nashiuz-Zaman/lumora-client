// THIS IS A PAGE
import { CollectionCard } from "@/components/page-specific";
import { DashboardPageHeading, InnerContainer } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central Products Management | Admin Panel",
};

const AdminCentralProductManagementPage = () => {
  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <DashboardPageHeading className="mb-6" text={"All Products"} />

        <CollectionCard
          href="/admin/products/all-products"
          noDeleteBtn={true}
          title="All Products"
        />
      </section>
    </InnerContainer>
  );
};

export default AdminCentralProductManagementPage;
