"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation"; // 👈
import { ProductsLayoutTopPanel } from "./ProductsLayoutTopPanel";
import { usePortalTarget } from "@/hooks";
import AddToProductCollectionModal from "@/components/modals/AddToProductCollectionModal";

export const AdminProductsLayoutMain = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { ref, target } = usePortalTarget();
  const params = useParams<{ slug?: string }>();

  const slug = params?.slug;

  return (
    <div className="grid grid-rows-[auto_1fr] h-[calc(100vh-7rem)]">
      {/* Top panel */}
      <ProductsLayoutTopPanel portalRef={ref} />

      {slug && <AddToProductCollectionModal target={target} slug={slug} />}

      {/* Main content */}
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
