"use client";

// Core
import { ReactNode } from "react";

// Hooks
import { ProductsLayoutTopPanel } from "./ProductsLayoutTopPanel";
import { CreateCollectionModal } from "@/components/modals";
import { usePortalTarget } from "@/hooks";

// Components
export const AdminProductsLayoutMain = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { target, ref: portalRef } = usePortalTarget<HTMLDivElement>();

  return (
    <div className="grid grid-rows-[auto_1fr] grow">
      {/* Top panel */}
      <ProductsLayoutTopPanel portalRef={portalRef} />

      <CreateCollectionModal portalTarget={target} />

      {/* Main content */}
      <div className="overflow-y-auto flex flex-col">{children}</div>
    </div>
  );
};
