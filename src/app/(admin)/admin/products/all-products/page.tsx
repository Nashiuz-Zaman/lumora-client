import { AllProductsMain } from "@/components/page-specific";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Products | Admin Panel",
};

const AdminDatabaseAllProductsPage = () => {
  return (
    <Suspense>
      <div className="grow flex flex-col">
        <h2 className="font-semibold xl:text-2xl border-b border-neutral-200  px-5 py-3 bg-white">
          All Products
        </h2>

        <AllProductsMain />
      </div>
    </Suspense>
  );
};

export default AdminDatabaseAllProductsPage;
