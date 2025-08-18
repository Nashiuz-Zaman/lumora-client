import { DashboardPageHeading, InnerContainer } from "@/components/shared";
import { ProductSortOptions } from "@/constants/product";
import Link from "next/link";

export const metadata = {
  title: "Central Products Management | Admin Panel",
};

const AdminCentralProductManagementPage = () => {
  return (
    <InnerContainer>
      <DashboardPageHeading
        className="mb-10 text-primary"
        text={"All Products"}
      />

      <Link
        className="inline-block mb-20"
        href={`/admin/database/products/all-products?page=1&sort=${ProductSortOptions[0]?.value}`}
      >
        <CollectionCard noDeleteBtn={true} title="All Products" />
      </Link>

      <DashboardPageHeading
        className="mb-5 text-primary"
        text={"Product Collections"}
      />

      {/* <Collections /> */}
    </InnerContainer>
  );
};

export default AdminCentralProductManagementPage;
