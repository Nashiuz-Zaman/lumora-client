"use client";

// Core / Third-party
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { InnerContainer, LinkBtn } from "@/components/shared";
import { ProductIcon } from "@/components/shared";

interface ITopPanelProductsProps {
  portalRef?: (node: HTMLDivElement | null) => void;
}

export const ProductsLayoutTopPanel = ({
  portalRef,
}: ITopPanelProductsProps) => {
  const path = usePathname();
  const productsRootPageRegex = /^\/admin\/products$/;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToAddProductUrl = `${path}/create`;

  if (!isClient) return null;

  return (
    <div className="bg-white h-20 border-b border-neutral-200 flex items-center">
      <InnerContainer className="flex items-center h-full">
        {/* Create Product button */}
        {productsRootPageRegex.test(path) && (
          <LinkBtn
            href={goToAddProductUrl}
            className="!primaryOutlinedClasses !py-2 !px-4 ml-auto"
          >
            <ProductIcon className="text-lg" />
            <span>Create Product</span>
          </LinkBtn>
        )}

        {/* Create Collection button */}
        {productsRootPageRegex.test(path) && (
          <div ref={portalRef} id="create-collection-button-portal"></div>
        )}
      </InnerContainer>
    </div>
  );
};
