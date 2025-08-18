"use client";

// Core
import { ReactNode } from "react";

// Hooks
import { useElementHeight } from "@/hooks/useElementHeight";
import { ProductsLayoutTopPanel } from "./ProductsLayoutTopPanel";
import { CreateCollectionModal } from "@/components/modals";
import { usePortalTarget } from "@/hooks";

// Components
const AdminProductsLayoutMain = ({ children }: { children: ReactNode }) => {
  const { ref: topPanelRef, height } = useElementHeight<HTMLDivElement>();
  const { target, ref: portalRef } = usePortalTarget<HTMLDivElement>();

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      {/* Top panel */}
      <ProductsLayoutTopPanel ref={topPanelRef} portalRef={portalRef} />

      <CreateCollectionModal portalTarget={target} />

      {/* Main content */}
      {height !== null && (
        <div
          className="overflow-y-auto flex flex-col"
          style={{ height: `calc(100vh - ${height}px)` }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AdminProductsLayoutMain;
