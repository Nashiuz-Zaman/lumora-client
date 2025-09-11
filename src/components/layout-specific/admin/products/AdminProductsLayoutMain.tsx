"use client";

// Core
import { ReactNode } from "react";

// Hooks
import { ProductsLayoutTopPanel } from "./ProductsLayoutTopPanel";

// Components
export const AdminProductsLayoutMain = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="grid grid-rows-[auto_1fr] grow">
      {/* Top panel */}
      <ProductsLayoutTopPanel />

      {/* Main content */}
      <div className="overflow-y-auto flex flex-col">{children}</div>
    </div>
  );
};
