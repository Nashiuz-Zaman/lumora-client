"use client";

// Core / Third-party
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { InnerContainer, LinkBtn } from "@/components/shared";
import { ProductIcon } from "@/components/shared";

interface IProductsLayoutTopPanelProps {
  portalRef?: (node: HTMLDivElement | null) => void;
}

export const ProductsLayoutTopPanel = ({
  portalRef,
}: IProductsLayoutTopPanelProps) => {
  const path = usePathname();
  const productsRootPageRegex = /^\/admin\/products$/;
  const productCollectionPageRegex =
    /^\/admin\/products\/product-collection\/[^\/]+$/;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-white h-20 border-b border-neutral-200 flex items-center">
      <InnerContainer className="flex items-center h-full gap-4 justify-center sm:justify-end">
        {/* Create Product button */}
        {(productsRootPageRegex.test(path) ||
          productCollectionPageRegex.test(path)) && (
          <LinkBtn
            href="/admin/products/create"
            className="!primaryClasses !py-2 !px-5 !rounded-full"
          >
            <ProductIcon className="text-lg" />
            <span>Create Product</span>
          </LinkBtn>
        )}

        {/* Add to Collection Button portal target */}
        {productCollectionPageRegex.test(path) && <div ref={portalRef}></div>}
      </InnerContainer>
    </div>
  );
};
