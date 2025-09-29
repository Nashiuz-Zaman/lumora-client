"use client";

import { ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import { usePortalTarget } from "@/hooks";
import AddToProductCollectionModal from "@/components/modals/AddToProductCollectionModal";

// Shared components
import { TopPanel } from "../../../page-specific/admin-dashboard-pages/shared/TopPanel";
import { LinkBtn } from "@/components/shared";

export const AdminProductsLayoutMain = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { ref, target } = usePortalTarget();
  const params = useParams<{ slug?: string }>();
  const path = usePathname();
  const slug = params?.slug;

  const productCollectionPageRegex =
    /^\/admin\/products\/product-collection\/[^\/]+$/;

  return (
    <div className="max-h-[calc(100vh-7rem)] h-full flex flex-col">
      {/* Reusable top panel */}
      <TopPanel
        actions={
          <>
            {path !== "/admin/products/create" && (
              <LinkBtn
                href="/admin/products/create"
                className="!primaryClasses !py-2 !px-5 !rounded-full"
              >
                +<span>New Product</span>
              </LinkBtn>
            )}

            {productCollectionPageRegex.test(path) && <div ref={ref}></div>}
          </>
        }
      />

      {/* Collection modal */}
      {slug && <AddToProductCollectionModal target={target} slug={slug} />}

      {/* Main content */}
      <div className="grow overflow-y-auto">{children}</div>
    </div>
  );
};
