"use client";

// Core / Third-party
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ref, useEffect, useState } from "react";

// Components
import { InnerContainer, LinkBtn } from "@/components/shared";
import BackIcon from "@/components/shared/icons/BackIcon";
import ProductIcon from "@/components/shared/icons/ProductIcon";

// Hooks
import { useBackRoute } from "@/hooks/useBackRoute";

interface ITopPanelProductsProps {
  ref?: Ref<HTMLDivElement>;
  portalRef: (node: HTMLDivElement | null) => void;
}

export const ProductsLayoutTopPanel = ({
  ref,
  portalRef,
}: ITopPanelProductsProps) => {
  const path = usePathname();
  const productsRootPageRegex = /^\/admin\/products$/;

  const [isClient, setIsClient] = useState(false);
  const { backRouteUrl, setBackRouteManually } = useBackRoute();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToAddProductUrl = `${path}/all-products/create`;

  if (!isClient) return null;

  return (
    <div
      ref={ref}
      className="bg-white h-20 border-b border-neutral-200 flex items-center"
    >
      <InnerContainer className="flex items-center h-full">
        {/* Back button */}
        {backRouteUrl && (
          <Link
            href={backRouteUrl}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <BackIcon />
            <span>Back</span>
          </Link>
        )}

        {/* Create Product button */}
        {productsRootPageRegex.test(path) && (
          <LinkBtn
            onClick={() => setBackRouteManually(`${path}`)}
            href={goToAddProductUrl}
            modifyClasses="!successClasses !rounded-full !py-2 !px-4 ml-auto"
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
